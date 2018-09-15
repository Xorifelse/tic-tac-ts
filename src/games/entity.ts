import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'
import { IsString, MinLength } from 'class-validator';

export enum Colors {
  red = 'red',
  blue = 'blue',
  green = 'green',
  yellow = 'yellow',
  magenta = 'magenta',
}

type Row = [string, string, string]
export type Gameboard = [Row, Row, Row]

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @IsString()
  @MinLength(1)
  @Column('text', {nullable:false})
  name: string

  @Column('enum', {enum: Colors})
  color: Colors

  @Column('json', {nullable:false})
  board: Gameboard
}