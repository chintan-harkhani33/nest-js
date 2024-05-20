import { Injectable, BadRequestException, HttpStatus, Body, Logger } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt';
import { faker, th } from '@faker-js/faker';
import { MULTIROLES, ROLES } from '../shared/constants/globle.constrant';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.user.dto';
import { ImageDto } from './dto/uploade.dto';
import { ConfigService } from '@nestjs/config';
import { GetObjectCommand, PutObjectCommand, PutObjectCommandInput, PutObjectCommandOutput, S3, S3Client } from '@aws-sdk/client-s3';
import * as AWS from 'aws-sdk';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';

@Injectable()
export class UserService {
  // private logger =new Logger()
  // private readonly region = this.configService.get(process.env.S3_REGION) || 'us-east-1';
  private region: string;
  private s3: S3;
  private s3S : S3
  // private readonly s3Client  = new S3Client({
    // region : this.configService.getOrThrow('AWS_S3_REGION'),
  //   region : this.configService.get(process.env.S3_REGION) || 'us-east-1',
  // })
  constructor(
    private readonly prismaService: PrismaService,
    private readonly jwtService: JwtService,
    private readonly configService : ConfigService
  ) {
    this.region = configService.get<string>(process.env.S3_REGION) || 'ap-south-1';
    this.s3 = new S3({
      region: this.region,
       credentials: {
        accessKeyId: process.env.S3_ACCESS_KEY ,
        secretAccessKey: process.env.S3_SECRET_KEY
      }
    });
  } 

  async Ragister(createUserDto: CreateUserDto) {
    if (!createUserDto.roles || createUserDto.roles.length === 0) {
      throw new BadRequestException('At least one role must be provided during registration');
    }
  
    // Validate roles against the list of valid roles
    for (const role of createUserDto.roles) {
      if (!Object.values(MULTIROLES).includes(role)) {
        throw new BadRequestException(`Invalid role '${role}' provided during registration`);
      }
    }
  
    const HasePassword = await bcrypt.hash(createUserDto.password, 10);
    const User = await this.prismaService.user.create({
      data: {
        ...createUserDto,
        password: HasePassword
      },
    });
    return {
      StatusCode: HttpStatus.CREATED,
      message: 'User Created Successfully',
      Data: User,
    };
  }

  async Login(loginDto: LoginDto) {
    const { email, password } = loginDto;
    const EmailFind = await this.prismaService.user.findUnique({
      where: {
        email: email,
      },
    });
    if (!EmailFind) {
      throw new BadRequestException('Invalid User');
    }
    const ComaprePassword = await bcrypt.compare(password, EmailFind.password);
    if (!ComaprePassword) {
      throw new BadRequestException('Invalid Password');
    }
    const data = {
      username: EmailFind.username,
      Email: email,
      firstname: EmailFind.firstname,
      lastname: EmailFind.lastname,
      role: EmailFind.role,
      roles : EmailFind.roles,
    };
    const Token = await this.jwtService.signAsync(data);
    return {
      StatusCode: HttpStatus.OK,
      message: 'User Login Successfully',
      data: {
        token: Token,
      },
    };
  }

  async findAll() {
    const FindData = await this.prismaService.user.findMany();
    if (!FindData.length) {
      throw new BadRequestException('No Data Found');
    }
    return {
      StatusCode: HttpStatus.OK,
      message: 'SuccessFully Fetch Data !',
      Data: FindData,
    };
  }

  async findOne(id: number) {
    const findData = await this.prismaService.user.findUnique({
      where: {
        id: id,
      },
    });
    if (!findData) {
      throw new BadRequestException('No Data Found');
    }
    return {
      StatusCode: HttpStatus.OK,
      message: 'Data Found',
      Data: findData,
    };
  }

  async UserCreateFaker(createUserDto: CreateUserDto) {
    const user = [];
    for (let i = 1; i <= 100; i++) {
      const users = {
        username: faker.internet.userName(),
        firstname: faker.person.firstName(),
        lastname: faker.person.lastName(),
        email: faker.internet.email(),
        password: faker.internet.password(),
        role: faker.helpers.arrayElement(Object.values(ROLES)),
      };
      user.push(users);
    }
    const CreateUser = await this.prismaService.user.createMany({ data: user });
    return {
      StatusCode: HttpStatus.OK,
      message: 'User Created Successfully',
      Data: CreateUser,
    };
  }

  async searchUsers(search: string) {
    let data = await this.prismaService.user.findMany({
      where: {
        OR: [
          { username: { contains: search.trim() } },
          { email: { contains: search.trim() } },
          { role: { contains: search.trim() } },
        ],
      },
    });

    if (data.length === 0) {
      throw new BadRequestException('No Record found');
    }
    return {
      StatusCode: HttpStatus.OK,
      message: 'Successfully Fetch Data',
      Data: data,
    };
  }

  async uploadFile(file: Express.Multer.File, Body :ImageDto) {
    if(!file){
      throw new BadRequestException('File not found');
    }
    const { originalname } = file;
     
    const createdImage = await this.prismaService.file.create({
      data: {
        ...Body,
        url: `${process.env.IMAGE_URL}${originalname}`,
      },
    });
   return { message: 'File uploaded successfully!', file: createdImage };
  }  
  async Uplode(file:Express.Multer.File ,key :string ,FolderName :string){
    const Buckets = this.configService.get(process.env.S3_bUCKET_NAME) ||'demo-api124';
    const Input : PutObjectCommandInput ={
      Body :file.buffer,
      Bucket : Buckets,
      Key : `${FolderName}/${key}`,
      ContentType :file.mimetype,
      ACL : 'private'
    };
    try {
      const response: PutObjectCommandOutput = await this.s3.send(
        new PutObjectCommand(Input)
      );
      
      if(response.$metadata.httpStatusCode === 200){
        return {
          message : 'File Uploaded Successfully',
          statusCode : response.$metadata.httpStatusCode,
          url : `https://${Buckets}.s3.${this.region}.amazonaws.com/${FolderName}/${key}`
        }
      }
      throw new BadRequestException("Images Not Saved to s3 !");
    } catch (error) {
      throw error;
    }
  }
 
  async generatePresignedUrl(key: string): Promise<any> {
    return this.getPresignedUrl(key);
  }

  private async getPresignedUrl(key: string): Promise<object> {
    const bucket = this.configService.get<string>(process.env.S3_bUCKET_NAME) || 'demo-api124';
    const command = new GetObjectCommand({
      Bucket: bucket,
      Key: key,
    });

    console.log(command);
    
    try {
      const url = await getSignedUrl(this.s3, command, { expiresIn: 3600 });
      console.log(url);
      
      return {
        message : 'Url Created Successfully',
        statusCode : HttpStatus.CREATED,
        url : url
      };
    } catch (error) {
      throw new BadRequestException('Could not generate presigned URL', error.message);
    }
  }
}


