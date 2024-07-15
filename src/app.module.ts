import { ConfigModule } from '@nestjs/config';
import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LoggerMiddleware } from './logger/logger.middleware';
import { ProjectModule } from './project/entities/project.module';
import { PostModule } from './post/entities/post.module';
import { User } from './users/entities/user.entity';
import { Profile } from './profile/entities/profile.entity';
import { Post } from './post/entities/post.entity';
import { Project } from './project/entities/project.entity';
import { ProfileModule } from './profile/profile.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: parseInt(process.env.DB_PORT, 10),
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Profile, Post, Project],
      migrations: [__dirname + '/migrations/*.ts'],
      synchronize: false,
    }),
    UsersModule,
    ProjectModule,
    ProfileModule,
    PostModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
