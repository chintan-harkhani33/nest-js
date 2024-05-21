"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcrypt");
const faker_1 = require("@faker-js/faker");
const globle_constrant_1 = require("../shared/constants/globle.constrant");
const config_1 = require("@nestjs/config");
const client_s3_1 = require("@aws-sdk/client-s3");
const s3_request_presigner_1 = require("@aws-sdk/s3-request-presigner");
let UserService = class UserService {
    constructor(prismaService, jwtService, configService) {
        this.prismaService = prismaService;
        this.jwtService = jwtService;
        this.configService = configService;
        this.region = configService.get(process.env.S3_REGION) || 'ap-south-1';
        this.s3 = new client_s3_1.S3({
            region: this.region,
            credentials: {
                accessKeyId: process.env.S3_ACCESS_KEY,
                secretAccessKey: process.env.S3_SECRET_KEY
            }
        });
    }
    async Ragister(createUserDto) {
        if (!createUserDto.roles || createUserDto.roles.length === 0) {
            throw new common_1.BadRequestException('At least one role must be provided during registration');
        }
        for (const role of createUserDto.roles) {
            if (!Object.values(globle_constrant_1.MULTIROLES).includes(role)) {
                throw new common_1.BadRequestException(`Invalid role '${role}' provided during registration`);
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
            StatusCode: common_1.HttpStatus.CREATED,
            message: 'User Created Successfully',
            Data: User,
        };
    }
    async Login(loginDto) {
        const { email, password } = loginDto;
        const EmailFind = await this.prismaService.user.findUnique({
            where: {
                email: email,
            },
        });
        if (!EmailFind) {
            throw new common_1.BadRequestException('Invalid User');
        }
        const ComaprePassword = await bcrypt.compare(password, EmailFind.password);
        if (!ComaprePassword) {
            throw new common_1.BadRequestException('Invalid Password');
        }
        const data = {
            username: EmailFind.username,
            Email: email,
            firstname: EmailFind.firstname,
            lastname: EmailFind.lastname,
            role: EmailFind.role,
            roles: EmailFind.roles,
        };
        const Token = await this.jwtService.signAsync(data);
        return {
            StatusCode: common_1.HttpStatus.OK,
            message: 'User Login Successfully',
            data: {
                token: Token,
            },
        };
    }
    async findAll() {
        const FindData = await this.prismaService.user.findMany();
        if (!FindData.length) {
            throw new common_1.BadRequestException('No Data Found');
        }
        return {
            StatusCode: common_1.HttpStatus.OK,
            message: 'SuccessFully Fetch Data !',
            Data: FindData,
        };
    }
    async findOne(id) {
        const findData = await this.prismaService.user.findUnique({
            where: {
                id: id,
            },
        });
        if (!findData) {
            throw new common_1.BadRequestException('No Data Found');
        }
        return {
            StatusCode: common_1.HttpStatus.OK,
            message: 'Data Found',
            Data: findData,
        };
    }
    async UserCreateFaker(createUserDto) {
        const user = [];
        for (let i = 1; i <= 100; i++) {
            const users = {
                username: faker_1.faker.internet.userName(),
                firstname: faker_1.faker.person.firstName(),
                lastname: faker_1.faker.person.lastName(),
                email: faker_1.faker.internet.email(),
                password: faker_1.faker.internet.password(),
                role: faker_1.faker.helpers.arrayElement(Object.values(globle_constrant_1.ROLES)),
            };
            user.push(users);
        }
        const CreateUser = await this.prismaService.user.createMany({ data: user });
        return {
            StatusCode: common_1.HttpStatus.OK,
            message: 'User Created Successfully',
            Data: CreateUser,
        };
    }
    async searchUsers(search) {
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
            throw new common_1.BadRequestException('No Record found');
        }
        return {
            StatusCode: common_1.HttpStatus.OK,
            message: 'Successfully Fetch Data',
            Data: data,
        };
    }
    async uploadFile(file, Body) {
        if (!file) {
            throw new common_1.BadRequestException('File not found');
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
    async Uplode(file, key, FolderName) {
        const Buckets = this.configService.get(process.env.S3_bUCKET_NAME) || 'demo-api124';
        const Input = {
            Body: file.buffer,
            Bucket: Buckets,
            Key: `${FolderName}/${key}`,
            ContentType: file.mimetype,
            ACL: 'private'
        };
        try {
            const response = await this.s3.send(new client_s3_1.PutObjectCommand(Input));
            if (response.$metadata.httpStatusCode === 200) {
                return {
                    message: 'File Uploaded Successfully',
                    statusCode: response.$metadata.httpStatusCode,
                    url: `https://${Buckets}.s3.${this.region}.amazonaws.com/${FolderName}/${key}`
                };
            }
            throw new common_1.BadRequestException("Images Not Saved to s3 !");
        }
        catch (error) {
            throw error;
        }
    }
    async generatePresignedUrl(key) {
        return this.getPresignedUrl(key);
    }
    async getPresignedUrl(key) {
        const bucket = this.configService.get(process.env.S3_bUCKET_NAME) || 'demo-api124';
        const command = new client_s3_1.GetObjectCommand({
            Bucket: bucket,
            Key: key,
        });
        console.log(command);
        try {
            const url = await (0, s3_request_presigner_1.getSignedUrl)(this.s3, command, { expiresIn: 3600 });
            console.log(url);
            return {
                message: 'Url Created Successfully',
                statusCode: common_1.HttpStatus.CREATED,
                url: url
            };
        }
        catch (error) {
            throw new common_1.BadRequestException('Could not generate presigned URL', error.message);
        }
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService,
        config_1.ConfigService])
], UserService);
//# sourceMappingURL=user.service.js.map