import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Task, TaskStatus } from './task.entity';
import { CreateTaskDto, UpdateTaskStatusDto } from './tasks.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private tasksRepository: Repository<Task>,
  ) {}

  async findAll(status?: TaskStatus): Promise<Task[]> {
    if (status) {
      return this.tasksRepository.find({ where: { status } });
    }
    return this.tasksRepository.find();
  }

  async create(createTaskDto: CreateTaskDto): Promise<Task> {
    const task = this.tasksRepository.create(createTaskDto);
    return this.tasksRepository.save(task);
  }

  async updateStatus(updateTaskStatusDto: UpdateTaskStatusDto): Promise<Task> {
    const { id, status } = updateTaskStatusDto;
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    task.status = status;
    return this.tasksRepository.save(task);
  }

  async remove(id: number): Promise<{ id: number }> {
    const task = await this.tasksRepository.findOne({ where: { id } });
    if (!task) {
      throw new NotFoundException(`Task with id ${id} not found`);
    }
    await this.tasksRepository.remove(task);
    return { id };
  }
}
