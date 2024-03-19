import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskStatus } from './tasks-status.enum';

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
    const { title, description } = dto;
    const task = this.taskRepository.create({
      title,
      description,
      status: TaskStatus.Open,
    });
    await this.taskRepository.save(task);
    return task;
  }
  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }

  async deleteTaskById(id: string): Promise<void> {
    const found = await this.taskRepository.findOne({ where: { id } });
    if (!found) {
      throw new NotFoundException(`Task with "${id}" not found!`);
    }
    await this.taskRepository.delete(id);
  }

  // updateTask(id: string, createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   let theTask = this.tasks.find((task) => task.id == id);
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  //   theTask = { title, description, status: TaskStatus.Open, id: id };
  //   this.tasks.push(theTask);
  //   return theTask;
  // }
}
