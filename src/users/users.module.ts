import { Module } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Post } from 'src/post/entities/post.entity';
import { Project } from 'src/project/entities/project.entity';
import { ProfileModule } from 'src/profile/profile.module';

@Module({
  imports: [TypeOrmModule.forFeature([User, Post, Project]), ProfileModule],
  controllers: [UsersController],
  providers: [UsersService],
})
export class UsersModule {}
