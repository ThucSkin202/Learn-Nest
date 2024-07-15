import { Entity, Column, PrimaryGeneratedColumn, OneToOne } from 'typeorm';
import { User } from '../../users/entities/user.entity';

@Entity()
export class Profile {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @OneToOne(() => User, (user) => user.profile)
  user: User;
}
