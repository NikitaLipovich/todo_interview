import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  Query,
  HttpStatus,
} from '@nestjs/common';
import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiQuery,
  ApiBody,
} from '@nestjs/swagger';
import { TasksService } from './tasks.service';
import { CreateTaskDto, UpdateTaskDto, TaskResponseDto } from './tasks.dto';
import { TaskStatus } from './task.entity';

/**
 * Controller for managing tasks
 */
@ApiTags('tasks')
@Controller('api/tasks')
export class TasksController {
  constructor(private readonly tasksService: TasksService) {}

  /**
   * Get all tasks or filter by status
   */
  @Get('list')
  @ApiOperation({ summary: 'Retrieve list of tasks' })
  @ApiQuery({
    name: 'status',
    required: false,
    enum: TaskStatus,
    description: 'Filter tasks by status',
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'List of tasks',
    type: [TaskResponseDto],
  })
  async list(@Query('status') status?: TaskStatus) {
    if (status) {
      return await this.tasksService.findByStatus(status);
    }
    return await this.tasksService.findAll();
  }

  /**
   * Create a new task
   */
  @Post('create')
  @ApiOperation({ summary: 'Create a new task' })
  @ApiBody({ type: CreateTaskDto })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Task successfully created',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Invalid task data',
  })
  async create(@Body() createTaskDto: CreateTaskDto) {
    return await this.tasksService.create(createTaskDto);
  }

  /**
   * Update a task status
   */
  @Patch('update')
  @ApiOperation({ summary: 'Update status of a task' })
  @ApiBody({ 
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 },
        status: { enum: Object.values(TaskStatus), example: TaskStatus.COMPLETED }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task status updated',
    type: TaskResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  async update(@Body() updateData: { id: number; status: TaskStatus }) {
    return await this.tasksService.update(updateData.id, { status: updateData.status });
  }

  /**
   * Delete a task
   */
  @Delete('delete')
  @ApiOperation({ summary: 'Delete a task' })
  @ApiBody({
    schema: {
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Task deleted',
    schema: { 
      type: 'object',
      properties: {
        id: { type: 'number', example: 1 }
      }
    }
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Task not found',
  })
  async remove(@Body('id') id: number) {
    await this.tasksService.remove(id);
    return { id };
  }
}
