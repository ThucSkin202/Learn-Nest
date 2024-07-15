import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToMany,
  OneToOne,
  JoinColumn,
  JoinTable,
} from 'typeorm';
import { Project } from '../../project/entities/project.entity';
import { Profile } from '../../profile/entities/profile.entity';
import { Post } from '../../post/entities/post.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @ManyToMany(() => Post, (post) => post.users)
  @JoinTable()
  posts: Post[];

  @ManyToMany(() => Project, (project) => project.users)
  @JoinTable()
  projects: Project[];

  @OneToOne(() => Profile, (profile) => profile.user)
  @JoinColumn()
  profile: Profile;
}
