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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserController = void 0;
const common_1 = require("@nestjs/common");
const user_service_1 = require("./user.service");
const create_user_dto_1 = require("./dto/create-user.dto");
const login_user_dto_1 = require("./dto/login.user.dto");
const auth_gards_1 = require("../auth/auth.gards");
const role_gard_1 = require("../auth/roleauth/role.gard");
const role_decorator_1 = require("../auth/roleauth/role.decorator");
const globle_constrant_1 = require("../shared/constants/globle.constrant");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const swagger_1 = require("@nestjs/swagger");
const user_entity_1 = require("./entities/user.entity");
const login_entity_1 = require("./entities/login.entity");
const fatch_entity_1 = require("./entities/fatch.entity");
const uploade_dto_1 = require("./dto/uploade.dto");
let UserController = class UserController {
    constructor(userService) {
        this.userService = userService;
    }
    async createUser(body) {
        try {
            return await this.userService.Ragister(body);
        }
        catch (error) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            });
        }
    }
    async login(loginDto) {
        try {
            return await this.userService.Login(loginDto);
        }
        catch (error) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            });
        }
    }
    async GetAllUser() {
        try {
            return await this.userService.findAll();
        }
        catch (error) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            });
        }
    }
    async findOne(id) {
        try {
            return await this.userService.findOne(id);
        }
        catch (error) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            });
        }
    }
    async CreateUser(createUserDto) {
        return this.userService.UserCreateFaker(createUserDto);
    }
    async SerchingUser(search) {
        try {
            return await this.userService.searchUsers(search);
        }
        catch (error) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            });
        }
    }
    async uploadFile(file, body) {
        try {
            return await this.userService.uploadFile(file, body);
        }
        catch (error) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            });
        }
    }
    async uploadFiles(file) {
        try {
            const bucketKey = `${file.originalname}`;
            const FolderName = 'Images';
            console.log(bucketKey);
            return await this.userService.Uplode(file, bucketKey, FolderName);
        }
        catch (error) {
            throw new common_1.BadRequestException({
                statusCode: common_1.HttpStatus.BAD_REQUEST,
                error: error.message,
            });
        }
    }
    async GetUrl(key) {
        return await this.userService.generatePresignedUrl(key);
    }
};
exports.UserController = UserController;
__decorate([
    (0, swagger_1.ApiConflictResponse)({
        description: 'User already exist !',
        type: user_entity_1.ErrorRegisterDto,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'User Register Created SuccessFully!',
        type: user_entity_1.ResponseDto,
    }),
    (0, common_1.Post)('/rigister'),
    __param(0, (0, common_1.Body)(new common_1.ValidationPipe())),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "createUser", null);
__decorate([
    (0, swagger_1.ApiOkResponse)({
        description: 'User hase been SuccressFully Login!',
        type: login_entity_1.LoginSuucessDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({
        description: 'Invalid User And Password!',
        type: login_entity_1.ErrorLoginDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request' }),
    (0, common_1.Post)('/login'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [login_user_dto_1.LoginDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "login", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized', type: fatch_entity_1.ErrorFetchDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'SuucessFully Fetch Data.!',
        type: fatch_entity_1.FatchDataDto,
    }),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_gards_1.AuthGard),
    (0, role_decorator_1.Roles)(globle_constrant_1.MULTIROLES.GUEST, globle_constrant_1.MULTIROLES.OWNER),
    (0, common_1.UseGuards)(auth_gards_1.AuthGard, role_gard_1.MutiRoleGard),
    (0, common_1.Get)('/getAll'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetAllUser", null);
__decorate([
    (0, swagger_1.ApiUnauthorizedResponse)({ description: 'Unauthorized', type: fatch_entity_1.ErrorFetchDto }),
    (0, swagger_1.ApiOkResponse)({
        description: 'SuucessFully Fetch Data.!',
        type: fatch_entity_1.FetchOneDataDto,
    }),
    (0, swagger_1.ApiNotFoundResponse)({
        description: 'Data Not Found',
        type: fatch_entity_1.ErrorFetchOneDto,
    }),
    (0, swagger_1.ApiParam)({ name: 'id', description: 'User Id' }),
    (0, role_decorator_1.Roles)(globle_constrant_1.MULTIROLES.OWNER, globle_constrant_1.MULTIROLES.AUTHER),
    (0, swagger_1.ApiBearerAuth)(),
    (0, common_1.UseGuards)(auth_gards_1.AuthGard, role_gard_1.RoleGard),
    (0, common_1.Get)('/finddata/:id'),
    (0, common_1.UsePipes)(new common_1.ParseIntPipe({ errorHttpStatusCode: common_1.HttpStatus.NOT_ACCEPTABLE })),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "findOne", null);
__decorate([
    (0, common_1.Post)('/createuser'),
    (0, swagger_1.ApiConflictResponse)({
        description: 'User already exist !',
        type: user_entity_1.ErrorRegisterDto,
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'User Many Data Created SuccessFully!',
        type: user_entity_1.FakeResponseDto,
    }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_user_dto_1.CreateUserDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "CreateUser", null);
__decorate([
    (0, common_1.Get)('/search'),
    (0, swagger_1.ApiQuery)({
        name: 'search',
        description: 'Searching on role || username || email',
        type: String,
    }),
    (0, swagger_1.ApiOkResponse)({
        description: 'SuccessFully Serching Data .!',
        type: fatch_entity_1.FatchDataDto,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request', type: fatch_entity_1.ErrorFetchOneDto }),
    __param(0, (0, common_1.Query)('search')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "SerchingUser", null);
__decorate([
    (0, common_1.Post)('/upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: 'src/uploads',
            filename: (req, file, cb) => {
                const name = file.originalname.split('.')[0];
                cb(null, name);
            },
        }),
        fileFilter: (req, file, cb) => {
            if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/i)) {
                return cb(new Error('Only image files (jpg, jpeg, png, gif) are allowed!'), false);
            }
            cb(null, true);
        },
    })),
    (0, swagger_1.ApiConsumes)('multipart/form-data'),
    (0, swagger_1.ApiBody)({
        schema: {
            type: 'object',
            properties: {
                file: {
                    type: 'string',
                    format: 'binary',
                },
            },
        },
    }),
    (0, swagger_1.ApiCreatedResponse)({
        description: 'File uploaded successfully',
        type: uploade_dto_1.SuccessIamgeResponse,
    }),
    (0, swagger_1.ApiBadRequestResponse)({ description: 'Bad Request', type: uploade_dto_1.ErrorImageOneDto }),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, uploade_dto_1.ImageDto]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadFile", null);
__decorate([
    (0, common_1.Post)('/fileupload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file')),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "uploadFiles", null);
__decorate([
    (0, common_1.Get)('/url'),
    __param(0, (0, common_1.Query)('key')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UserController.prototype, "GetUrl", null);
exports.UserController = UserController = __decorate([
    (0, common_1.Controller)('User'),
    (0, swagger_1.ApiTags)('Users'),
    __metadata("design:paramtypes", [user_service_1.UserService])
], UserController);
//# sourceMappingURL=user.controller.js.map