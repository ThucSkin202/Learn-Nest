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
import { LoggingInterceptor } from '../logging/logging.interceptor';
import { httpMessage, httpStatus } from 'src/global/globalEnum';
import { ResponseData } from 'src/global/globalClass';
import { UpdatePostDto } from './dto/update-post.dto';
import { CreatePostDto } from './dto/create-post.dto';
import { PostsService } from './post.service';

@Controller('posts')
@UseInterceptors(LoggingInterceptor)
export class PostController {
  constructor(private readonly postService: PostsService) {}

  @Post()
  @UsePipes(new ValidationPipe())
  async create(@Body() createPostDto: CreatePostDto) {
    try {
      const data = await this.postService.create(createPostDto);
      return new ResponseData<CreatePostDto>(
        data,
        httpStatus.SUCCESS,
        'Created successfully',
      );
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
      const data = await this.postService.findAll();
      return new ResponseData<any>(data, httpStatus.SUCCESS, 'Get all posts');
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
      const data = await this.postService.findOne(+id);
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
  async update(@Param('id') id: number, @Body() updateUserDto: UpdatePostDto) {
    try {
      const data = await this.postService.update(+id, updateUserDto);
      return new ResponseData<any>(
        data,
        httpStatus.SUCCESS,
        'Update successfully',
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
      const data = await this.postService.remove(+id);
      return new ResponseData<any>(
        data,
        httpStatus.SUCCESS,
        'Deleted successfully',
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
