import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';

export enum TaskStatus {
  IN_PROGRESS = 'in progress',
  COMPLETED = 'completed',
}

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
    enum: TaskStatus,
    default: TaskStatus.IN_PROGRESS
  })
  @Column({
    type: 'text',
    default: TaskStatus.IN_PROGRESS
  })
  status: TaskStatus;

  @ApiProperty({ description: 'Task creation timestamp' })
  @CreateDateColumn()
  createdAt: Date;

  @ApiProperty({ description: 'Task last update timestamp' })
  @UpdateDateColumn()
  updatedAt: Date;
}
