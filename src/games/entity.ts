import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsJSON } from 'class-validator';

export enum Colors {
  red = 'red',
  blue = 'blue',
  green = 'green',
  yellow = 'yellow',
  magenta = 'magenta',
}

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  name: string

  @Column('enum', {enum: Colors})
  color: Colors

  @IsJSON()
  @Column('json', {nullable:false})
  board: string
}