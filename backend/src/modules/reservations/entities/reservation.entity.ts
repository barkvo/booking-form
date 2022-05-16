import { Reservation as ReservationInterface, ReservationId } from '../types/reservation.types';
import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Reservation implements ReservationInterface {
  @PrimaryGeneratedColumn('uuid')
  public id!: ReservationId;

  @Column({
    type: 'timestamptz',
  })
  public checkInDate!: Date;

  @Column({
    type: 'timestamptz',
  })
  public checkOutDate!: Date;

  @Column({
    type: 'integer',
  })
  public guestsAmount!: number;

  @Column({
    type: 'text',
  })
  public firstName!: string;

  @Column({
    type: 'text',
  })
  public lastName!: string;

  @Column({
    type: 'text',
  })
  public country!: string;

  @Column({
    type: 'text',
  })
  public city!: string;

  @Column({
    type: 'text',
  })
  public address!: string;

  @Column({
    type: 'text',
  })
  public postalCode!: string;

  @Column({
    type: 'text',
  })
  public email!: string;

  @Column({
    type: 'text',
  })
  public phone!: string;

  @CreateDateColumn({
    type: 'timestamptz',
  })
  public createdAt!: Date;

  @UpdateDateColumn({
    type: 'timestamptz',
  })
  public updatedAt!: Date;
}
