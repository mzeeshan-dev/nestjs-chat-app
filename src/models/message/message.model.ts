import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class Message extends Model {
  constructor(sender: number, message: string) {
    super();
    this.sender_id = sender;
    this.message = message;
  }

  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  sender_id: number;

  @Column
  message: string;

  @Column
  date: Date;
}
