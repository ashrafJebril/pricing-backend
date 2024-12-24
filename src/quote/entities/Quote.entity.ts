/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// eslint-disable-next-line prettier/prettier
@Entity()
export class Quote {
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

}
