import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  UseGuards,
  UseInterceptors,
  UploadedFile,
  ParseIntPipe,
  ValidationPipe,
  HttpStatus,
  BadRequestException,
  UsePipes,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginDto } from './dto/login.user.dto';
import { AuthGard } from '../auth/auth.gards';
import { MutiRoleGard, RoleGard } from '../auth/roleauth/role.gard';
import { Roles } from '../auth/roleauth/role.decorator';
import { MULTIROLES, ROLES } from '../shared/constants/globle.constrant';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import {
  ApiBadRequestResponse,
  ApiBasicAuth,
  ApiBearerAuth,
  ApiBody,
  ApiConflictResponse,
  ApiConsumes,
  ApiCreatedResponse,
  ApiHeader,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiParam,
  ApiPreconditionFailedResponse,
  ApiQuery,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import {
  ErrorRegisterDto,
  FakeResponseDto,
  ResponseDto,
  UserEntitny,
} from './entities/user.entity';
import { ErrorLoginDto, LoginSuucessDto } from './entities/login.entity';
import {
  ErrorFetchDto,
  ErrorFetchOneDto,
  FatchDataDto,
  FetchOneDataDto,
} from './entities/fatch.entity';
import {
  ErrorImageOneDto,
  ImageDto,
  SuccessIamgeResponse,
} from './dto/uploade.dto';

@Controller('User')
@ApiTags('Users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @ApiConflictResponse({
    description: 'User already exist !',
    type: ErrorRegisterDto,
  })
  @ApiCreatedResponse({
    description: 'User Register Created SuccessFully!',
    type: ResponseDto,
  })
  @Post('/rigister')
  async createUser(@Body(new ValidationPipe()) body: CreateUserDto) {
    try {
      return await this.userService.Ragister(body);
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      });
    }
  }

  @ApiOkResponse({
    description: 'User hase been SuccressFully Login!',
    type: LoginSuucessDto,
  })
  @ApiBadRequestResponse({
    description: 'Invalid User And Password!',
    type: ErrorLoginDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @Post('/login')
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.userService.Login(loginDto);
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      });
    }
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorFetchDto })
  @ApiOkResponse({
    description: 'SuucessFully Fetch Data.!',
    type: FatchDataDto,
  })
  @ApiBearerAuth()
  @UseGuards(AuthGard)
  @Roles(MULTIROLES.GUEST, MULTIROLES.OWNER)
  @UseGuards(AuthGard, MutiRoleGard)
  @Get('/getAll')
  async GetAllUser() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      });
    }
  }

  @ApiUnauthorizedResponse({ description: 'Unauthorized', type: ErrorFetchDto })
  @ApiOkResponse({
    description: 'SuucessFully Fetch Data.!',
    type: FetchOneDataDto,
  })
  @ApiNotFoundResponse({
    description: 'Data Not Found',
    type: ErrorFetchOneDto,
  })
  @ApiParam({ name: 'id', description: 'User Id' })
  @Roles(MULTIROLES.OWNER, MULTIROLES.AUTHER)
  @ApiBearerAuth()
  @UseGuards(AuthGard, RoleGard)
  @Get('/finddata/:id')
  @UsePipes(
    new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
  )
  async findOne(@Param('id') id: number) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      });
    }
  }

  @Post('/createuser')
  @ApiConflictResponse({
    description: 'User already exist !',
    type: ErrorRegisterDto,
  })
  @ApiCreatedResponse({
    description: 'User Many Data Created SuccessFully!',
    type: FakeResponseDto,
  })
  async CreateUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.UserCreateFaker(createUserDto);
  }

  @Get('/search')
  @ApiQuery({
    name: 'search',
    description: 'Searching on role || username || email',
    type: String,
  })
  @ApiOkResponse({
    description: 'SuccessFully Serching Data .!',
    type: FatchDataDto,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorFetchOneDto })
  async SerchingUser(@Query('search') search: string) {
    try {
      return await this.userService.searchUsers(search);
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      });
    }
  }

  @Post('/upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: 'src/uploads',
        filename: (req, file, cb) => {
          const name = file.originalname.split('.')[0];
          cb(null, name);
        },
      }),
      fileFilter: (req, file, cb) => {
        if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
          return cb(
            new Error('Only image files (jpg, jpeg, png, gif) are allowed!'),
            false,
          );
        }
        cb(null, true);
      },
    }),
  )
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        },
      },
    },
  })
  @ApiCreatedResponse({
    description: 'File uploaded successfully',
    type: SuccessIamgeResponse,
  })
  @ApiBadRequestResponse({ description: 'Bad Request', type: ErrorImageOneDto })
  async uploadFile(@UploadedFile() file: Express.Multer.File, body: ImageDto) {
    try {
      return await this.userService.uploadFile(file, body);
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      });
    }
  }
  @Post('/fileupload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFiles(@UploadedFile() file: Express.Multer.File) {
    try {
      const bucketKey = `${file.originalname}`;
      const FolderName = 'Images'
      console.log(bucketKey);
      
      return await this.userService.Uplode(file, bucketKey ,FolderName);
    } catch (error) {
      throw new BadRequestException({
        statusCode: HttpStatus.BAD_REQUEST,
        error: error.message,
      });
    }
  }

  @Get('/url')
  async GetUrl(@Query('key') key: string){
   return await this.userService.generatePresignedUrl(key);
  }
}
