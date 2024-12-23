/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// eslint-disable-next-line prettier/prettier
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phoneNumber: string;

  @Column()
  companyName: string;

  @Column()
  location: string;

  @Column()
  password: string

  @Column({default:true})
  isActive: boolean

  @Column({default:false})
  isDeleted:boolean

  @CreateDateColumn()
  createdAt: Date

  @UpdateDateColumn()
  updatedAt: Date

}
