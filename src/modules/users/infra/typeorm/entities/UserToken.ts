/* eslint-disable camelcase */
import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  Generated,
} from 'typeorm';

@Entity('userTokens')
class UserToken {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  @Generated('uuid')
  token: string;

  @Column()
  userId: string;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export default UserToken;
