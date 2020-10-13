import { Entity, Column, ObjectID, ObjectIdColumn } from 'typeorm';

@Entity('users')
export default class User {
  @ObjectIdColumn()
  id: ObjectID;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  valueAvailable: number = 0;
}
