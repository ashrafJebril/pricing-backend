/* eslint-disable prettier/prettier */
import { Quote } from '../../quote/entities/Quote.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

// eslint-disable-next-line prettier/prettier
@Entity()
export class Customer {
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

  @Column({ nullable: true })
  address: string;

  @Column({ nullable: true })
  city: string;

  @OneToMany(()=> Quote, (quote)=> quote.customer)
  quotes: Quote[]
}
