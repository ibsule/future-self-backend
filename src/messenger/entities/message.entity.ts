import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class MessageToFuture {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column()
  send_at: Date;

  @Column({ default: false })
  sent: boolean;

  @Column()
  @ManyToOne(() => User, (user) => user.id)
  created_by: string;

  @CreateDateColumn()
  created_at: Date;
}
