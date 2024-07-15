import { Post } from 'src/post/entities/post.entity';
import { Profile } from 'src/profile/entities/profile.entity';
import { Project } from 'src/project/entities/project.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: 'localhost',
  port: 3306,
  username: 'root',
  password: '',
  database: 'mynest',
  entities: [User, Profile, Project, Post],
  migrations: ['src/migration/*.ts'],
  synchronize: false,
});

AppDataSource.initialize()
  .then(() => {
    console.log('Data Source has been initialized!');
  })
  .catch((err) => {
    console.error('Error during Data Source initialization', err);
  });
