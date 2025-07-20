import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskStatusDto } from './tasks.dto';
import { Task, TaskStatus } from './task.entity';

@ApiTags('tasks')
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  @Get('list')
  @ApiOperation({ summary: 'Retrieve list of tasks' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: TaskStatus,
    description: 'Filter tasks by status',
  })
  @ApiResponse({ status: 200, description: 'List of tasks', type: [Task] })
  async list(@Query('status') status?: TaskStatus): Promise<Task[]> {
    return this.tasksService.findAll(status);
  }

  @Post('create')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({ status: 201, description: 'Task created', type: Task })
  async create(@Body() createDto: CreateTaskDto): Promise<Task> {
    return this.tasksService.create(createDto);
  }

  @Patch('update')
  @ApiOperation({ summary: 'Update status of a task' })
  @ApiBody({ type: UpdateTaskStatusDto })
  @ApiResponse({ status: 200, description: 'Task status updated', type: Task })
  async update(@Body() updateDto: UpdateTaskStatusDto): Promise<Task> {
    return this.tasksService.updateStatus(updateDto);
  }

  @Delete('delete')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiBody({
    description: 'Task ID to delete',
    schema: {
      type: 'object',
      properties: {
        id: { 
          type: 'number', 
          description: 'The ID of the task to delete',
          example: 1 
        }
      },
      required: ['id']
    }
  })
  @ApiResponse({
    status: 200,
    description: 'Task deleted',
    schema: { example: { id: 1 } },
  })
  @ApiResponse({
    status: 404,
    description: 'Task not found',
  })
  async remove(@Body('id') id: number): Promise<{ id: number }> {
    return this.tasksService.remove(id);
  }
}