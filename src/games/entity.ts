import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm'
import { BaseEntity } from 'typeorm/repository/BaseEntity'

enum Colors {
  Red = "red",
  Blue = "blue",
  Green = "green",
  Yellow = "yellow",
  Magenta = "magenta"
}

@Entity()
export default class Game extends BaseEntity {

  @PrimaryGeneratedColumn()
  id?: number

  @Column('text', {nullable:false})
  name: string

  @Column('enum', {enum: Colors})
  color: Colors

  @Column('json', {nullable:false})
  board: string
}