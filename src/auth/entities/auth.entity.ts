import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AuthSession {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  user_id: string;

  @Column({ nullable: true, default: null })
  account_type: string;

  @Column({ nullable: true, default: null })
  auth_token_version: number;

  @CreateDateColumn()
  created_at: Date;
}
