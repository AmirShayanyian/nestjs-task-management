import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status.enum';
import { TasksFilterDto } from './dto/tasks-filter.dto';

@Injectable()
export class TasksService {
  constructor(
    @InjectRepository(Task)
    private taskRepository: TaskRepository,
  ) {}

  async getTaskById(id: string): Promise<Task> {
    const found = await this.taskRepository.findOne({ where: { id } });

    if (!found) {
      throw new NotFoundException(`Task with "${id}" not found!`);
    }
    return found;
  }

  async createTask(dto: CreateTaskDto): Promise<Task> {
    const { title, description, attachment } = dto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.Open,
      attachments: attachment,
    });
    await this.taskRepository.save(task);
    return task;
  }

  async getTasks(filterDto: TasksFilterDto): Promise<Task[]> {
    const { status, title } = filterDto;
    const query = this.taskRepository.createQueryBuilder('task');

    if (status) {
      query.andWhere('task.status = :status', { status });
    }
    if (title) {
      query.andWhere('task.title = :title', { title });
    }

    const tasks = await query.getMany();
    return tasks;
  }

  async deleteTaskById(id: string): Promise<void> {
    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with "${id}" not found!`);
    }
    await this.taskRepository.delete(id);
  }

  async updateTaskStatus(id: string, status: TaskStatus): Promise<Task> {
    const task = await this.getTaskById(id);
    task.status = status;
    await this.taskRepository.save(task);
    return task;
  }
}
