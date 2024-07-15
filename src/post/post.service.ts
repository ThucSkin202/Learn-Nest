import { Injectable, UsePipes, ValidationPipe } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from 'src/post/entities/post.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';

@Injectable()
export class PostsService {
  constructor(
    @InjectRepository(Post)
    private readonly postRepository: Repository<Post>,
  ) {}

  async create(createPostDto: CreatePostDto): Promise<Post> {
    const profile = this.postRepository.create(createPostDto);
    return this.postRepository.save(profile);
  }

  async findAll(): Promise<Post[]> {
    return this.postRepository.find();
  }

  @UsePipes(new ValidationPipe())
  async findOne(id: number): Promise<Post> {
    return this.postRepository.findOne({
      where: { id },
    });
  }

  @UsePipes(new ValidationPipe())
  async update(id: number, updatePostDto: UpdatePostDto): Promise<Post> {
    await this.postRepository.update(id, updatePostDto);
    return this.findOne(id);
  }

  @UsePipes(new ValidationPipe())
  async remove(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }
}
