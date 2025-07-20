import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto, UpdateTaskDto } from './tasks.dto';

/**
 * Service for managing tasks
 */
@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private readonly taskRepository: Repository<Task>,
  ) {}

  /**
   * Create a new task
   * @param createTaskDto - Task data
   * @returns Created task
   */
  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.taskRepository.create({
      text: createTaskDto.text,
      status: createTaskDto.status || TaskStatus.PENDING,
    });
    
    return await this.taskRepository.save(task);
  }

  /**
   * Get all tasks
   * @returns Array of all tasks
   */
  async findAll(): Promise<Task[]> {
    return await this.taskRepository.find({
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get tasks by status
   * @param status - Task status to filter by
   * @returns Array of tasks with specified status
   */
  async findByStatus(status: TaskStatus): Promise<Task[]> {
    return await this.taskRepository.find({
      where: { status },
      order: { createdAt: 'DESC' },
    });
  }

  /**
   * Get a task by ID
   * @param id - Task ID
   * @returns Task with specified ID
   * @throws NotFoundException if task not found
   */
  async findOne(id: number): Promise<Task> {
    const task = await this.taskRepository.findOne({
      where: { id },
    });

    if (!task) {
      throw new NotFoundException(`Task with ID ${id} not found`);
    }

    return task;
  }

  /**
   * Update a task
   * @param id - Task ID
   * @param updateTaskDto - Updated task data
   * @returns Updated task
   * @throws NotFoundException if task not found
   */
  async update(id: number, updateTaskDto: UpdateTaskDto): Promise<Task> {
    const task = await this.findOne(id);
    
    if (updateTaskDto.text !== undefined) {
      task.text = updateTaskDto.text;
    }
    
    if (updateTaskDto.status !== undefined) {
      task.status = updateTaskDto.status;
    }
    
    return await this.taskRepository.save(task);
  }

  /**
   * Delete a task
   * @param id - Task ID
   * @throws NotFoundException if task not found
   */
  async remove(id: number): Promise<void> {
    const task = await this.findOne(id);
    await this.taskRepository.remove(task);
  }

  /**
   * Mark task as completed
   * @param id - Task ID
   * @returns Updated task
   */
  async markAsCompleted(id: number): Promise<Task> {
    return await this.update(id, { status: TaskStatus.COMPLETED });
  }

  /**
   * Mark task as pending
   * @param id - Task ID
   * @returns Updated task
   */
  async markAsPending(id: number): Promise<Task> {
    return await this.update(id, { status: TaskStatus.PENDING });
  }

  /**
   * Get task statistics
   * @returns Object with task counts by status
   */
  async getStats(): Promise<{
    total: number;
    pending: number;
    completed: number;
  }> {
    const [total, pending, completed] = await Promise.all([
      this.taskRepository.count(),
      this.taskRepository.count({ where: { status: TaskStatus.PENDING } }),
      this.taskRepository.count({ where: { status: TaskStatus.COMPLETED } }),
    ]);

    return { total, pending, completed };
  }
}
