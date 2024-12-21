/* eslint-disable prettier/prettier */
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

// eslint-disable-next-line prettier/prettier
@Entity()
export class Price {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  catalogNumber: string;

  @Column()
  description: string;

  @Column()
  uom: string;

  @Column()
  productGroup: string;

  @Column()
  quantityBreak: string;

  @Column({ type: 'decimal' })
  usListPrice2025: number;
}
