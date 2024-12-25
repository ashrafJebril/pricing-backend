import { Customer } from '../../customer/entities/customer.entity';
import { Users } from '../../users/entities/User.entity';
import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

export enum QuoteStatus {
  DRAFT = 'draft',
  READY = 'ready',
  SENT = 'sent',
}

@Entity()
export class Quote {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  creatorId: number;

  @Column()
  customerId: number;

  @ManyToOne(() => Users)
  @JoinColumn({ name: 'creatorId' })
  creator: Users;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customerId' })
  customer: Customer;

  @Column({ type: 'json' })
  quote: any[];

  @Column({
    type: 'enum',
    enum: QuoteStatus,
    default: QuoteStatus.DRAFT,
  })
  status: QuoteStatus;

    @CreateDateColumn()
    createdAt: Date;
  
    @UpdateDateColumn()
    updatedAt: Date;
}