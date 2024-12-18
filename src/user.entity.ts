// user.entity.ts
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  gender: string;

  @Column()
  nationality: string;

  @Column()
  googleID: string;

  @Column({ default: false })
  isPremium: boolean;

  @Column()
  birthday: Date;

  @Column({ default: () => 'CURRENT_TIMESTAMP' })
  createdAt: Date;

  @Column({ default: 0 })
  amountPost: number;

  @Column({ default: 0 })
  amountReading: number;
}
