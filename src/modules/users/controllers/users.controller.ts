import {
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  Post,
  Put,
  Req,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

import { FileInterceptor } from '@nestjs/platform-express';
import LocalFileUploadProvider from 'src/shared/providers/FileUploadProvider/implementations/LocalFileUploadProvider';
import CreateUserDTO from '../dtos/CreateUser.dto';
import UsersServices from '../services/users.service';
import { GetUser } from '../decorators/getUser.decorator';
import Users from '../entities/Users.entity';

@Controller('users')
export class UsersController {
  constructor(
    @Inject(UsersServices)
    private usersServices: UsersServices,
    @Inject(LocalFileUploadProvider)
    private fileUploadProvider: IFileUploadProvider,
  ) {}

  //Get statement without any parameters
  //HttpCode if success is an OK(200)
  //Using the ClassSerializerInterceptor Makes the class-transform kick-in
  @Get()
  @HttpCode(HttpStatus.OK)
  @UseInterceptors(ClassSerializerInterceptor)
  public async GetAll() {
    console.log('gotten');
    return this.usersServices.getAllUsersService();
  }

  //Get statement by id
  //HttpCode if success is an OK(200)
  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  public async GetById(@Param('id') id: string) {
    return this.usersServices.getUserById(id);
  }

  @Post()
  @UsePipes(ValidationPipe)
  @HttpCode(HttpStatus.CREATED)
  public async CreateNewUser(@Body() user: CreateUserDTO) {
    return this.usersServices.createNewUsers(user);
  }

  @Post('/auth')
  @HttpCode(HttpStatus.ACCEPTED)
  public async Authenticate(
    @Body('username') username: string,
    @Body('password') password: string,
  ) {
    return await this.usersServices.authenticate(username, password);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.NO_CONTENT)
  public async DeleteById(@Param('id') id: string) {
    return this.usersServices.deleteUser(id);
  }

  @Put('/:id')
  @HttpCode(HttpStatus.OK)
  public async UpdateUser(
    @Param('id') id: string,
    @Body(ValidationPipe) user: CreateUserDTO,
  ) {
    return this.usersServices.updateUser(id, user);
  }

  @Post('upload')
  //@UseGuards(@AuthGuard())
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(@UploadedFile() file) {
    this.fileUploadProvider.upload(file);
  }

  //@UseGuards(@AuthGuard())
  @Post('/test')
  @UseGuards(AuthGuard())
  test(@GetUser() user: Users) {
    console.log(user);
  }
}
