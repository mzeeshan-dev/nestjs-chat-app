import { Column, Model, Table } from 'sequelize-typescript';

@Table
export class ResetPassToken extends Model {
  @Column({ primaryKey: true, autoIncrement: true })
  id: number;

  @Column
  email: string;

  @Column
  token: string;
}