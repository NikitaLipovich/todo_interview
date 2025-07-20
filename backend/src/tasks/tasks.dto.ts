import { ApiProperty } from '@nestjs/swagger';
import { TaskStatus } from './task.entity';

export class CreateTaskDto {
  @ApiProperty({ description: 'Text content of the task', example: 'Buy groceries' })
  text: string;

  @ApiProperty({
    description: 'Initial status of the task',
    enum: TaskStatus,
    example: TaskStatus.IN_PROGRESS,
  })
  status: TaskStatus;
}

export class UpdateTaskStatusDto {
  @ApiProperty({ description: 'Identifier of the task to update', example: 1 })
  id: number;

  @ApiProperty({
    description: 'New status value for the task',
    enum: TaskStatus,
    example: TaskStatus.COMPLETED,
  })
  status: TaskStatus;
}
