import { nanoid } from 'nanoid';
import { User } from 'src/user/entities/user.entity';
import {
  BeforeInsert,
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

  @Column({ unique: true, nullable: true })
  public_id: string;

  @Column()
  title: string;

  @Column()
  content: string;

  @Column({ nullable: true })
  html: string;

  @Column()
  send_at: Date;

  @Column({ default: false })
  sent: boolean;

  @Column()
  @ManyToOne(() => User, (user) => user.id)
  created_by: string;

  @CreateDateColumn()
  created_at: Date;

  @BeforeInsert()
  generatePublicId() {
    this.public_id = `msg_${nanoid()}`;
  }
}
