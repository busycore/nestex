import { Exclude } from 'class-transformer';
import { Column, Entity, PrimaryGeneratedColumn, Unique } from 'typeorm';

@Entity('users')
@Unique('unique', ['cpf', 'username'])
export default class Users {
  @PrimaryGeneratedColumn('uuid')
  public id: number;

  @Column()
  public name: string;

  @Column()
  public surname: string;

  @Column()
  public birth_date: Date;

  @Column()
  public cpf: number;

  @Column()
  public username: string;

  @Column()
  @Exclude()
  public password: string;
}
