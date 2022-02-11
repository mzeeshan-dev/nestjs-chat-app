import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Message extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  sender_id: number;

  @Column
  receiver_id: number;

  @Column
  message: string;

  @Column
  date: Date;
}
