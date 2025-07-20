import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsOptional, IsEnum, MaxLength } from 'class-validator';
import { TaskStatus } from './task.entity';

/**
 * Data Transfer Object for creating a new task
 */
export class CreateTaskDto {
  @ApiProperty({
    description: 'The text content of the task',
    example: 'Buy groceries',
    maxLength: 255
  })
  @IsString()
  @MaxLength(255)
  text: string;

  @ApiPropertyOptional({
    description: 'The status of the task',
    enum: TaskStatus,
    default: TaskStatus.PENDING,
    example: TaskStatus.PENDING
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus = TaskStatus.PENDING;
}

/**
 * Data Transfer Object for updating an existing task
 */
export class UpdateTaskDto {
  @ApiPropertyOptional({
    description: 'The text content of the task',
    example: 'Buy groceries and cook dinner',
    maxLength: 255
  })
  @IsOptional()
  @IsString()
  @MaxLength(255)
  text?: string;

  @ApiPropertyOptional({
    description: 'The status of the task',
    enum: TaskStatus,
    example: TaskStatus.COMPLETED
  })
  @IsOptional()
  @IsEnum(TaskStatus)
  status?: TaskStatus;
}

/**
 * Data Transfer Object for task response
 */
export class TaskResponseDto {
  @ApiProperty({
    description: 'The unique identifier of the task',
    example: 1
  })
  id: number;

  @ApiProperty({
    description: 'The text content of the task',
    example: 'Buy groceries'
  })
  text: string;

  @ApiProperty({
    description: 'The status of the task',
    enum: TaskStatus,
    example: TaskStatus.PENDING
  })
  status: TaskStatus;

  @ApiProperty({
    description: 'The date when the task was created',
    example: '2025-01-20T10:30:00.000Z'
  })
  createdAt: Date;

  @ApiProperty({
    description: 'The date when the task was last updated',
    example: '2025-01-20T11:45:00.000Z'
  })
  updatedAt: Date;
}
