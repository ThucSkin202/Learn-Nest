import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  // UseGuards,
  UsePipes,
  ValidationPipe,
  UseInterceptors,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { httpMessage, httpStatus } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
// import { RolesGuard } from '../roles/roles.guard';

@Controller('users')
// @UseGuards(RolesGuard)
@UseInterceptors(LoggingInterceptor)
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const data = await this.usersService.create(createUserDto);
      return new ResponseData<CreateUserDto>(data, httpStatus.SUCCESS, 'ok');
    } catch (error) {
      return new ResponseData<string>(
        null,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }

  @Get()
  async findAll(): Promise<ResponseData<any>> {
    try {
      const data = await this.usersService.findAll();
      return new ResponseData<any>(data, httpStatus.SUCCESS, 'Get all users');
    } catch (error) {
      return new ResponseData<string>(
        null,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: number): Promise<ResponseData<any>> {
    try {
      const data = await this.usersService.findOne(+id);
      return new ResponseData<any>(data, httpStatus.SUCCESS, 'ok');
    } catch (error) {
      return new ResponseData<string>(
        null,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  async update(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    try {
      const data = await this.usersService.update(+id, updateUserDto);
      return new ResponseData<any>(
        data,
        httpStatus.SUCCESS,
        'Update user successfully',
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    try {
      const data = await this.usersService.remove(+id);
      return new ResponseData<any>(
        data,
        httpStatus.SUCCESS,
        'User deleted successfully',
      );
    } catch (error) {
      return new ResponseData<string>(
        null,
        httpStatus.ERROR,
        httpMessage.ERROR,
      );
    }
  }
}
