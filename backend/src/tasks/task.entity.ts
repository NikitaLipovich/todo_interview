import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

/**
 * Task entity representing a TODO item
 */
@Entity()
export class Task {
  @ApiProperty({ description: 'Task unique identifier' })
  @PrimaryGeneratedColumn()
  id: number;

  @ApiProperty({ description: 'Task description text' })
  @Column()
  text: string;

  @ApiProperty({ 
    description: 'Current status of the task',
    enum: ['in progress', 'completed']
  })
  @Column()
  status: 'in progress' | 'completed';
}
