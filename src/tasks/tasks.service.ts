import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';
import { TaskRepository } from './tasks.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Task } from './task.entity';

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

  // getAllTasks(): Task[] {
  //   return this.tasks;
  // }
  // createTasks(createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   const task: Task = {
  //     id: uuid(),
  //     title,
  //     description,
  //     status: TaskStatus.Open,
  //   };
  //   this.tasks.push(task);
  //   return task;
  // }
  // getById(id: string): Task {
  //   const task = this.tasks.find((task) => task.id == id);
  //   if (!task) {
  //     throw new NotFoundException(`The task with the id of ${id} not found!`);
  //   }
  //   return task;
  // }
  // deleteTask(id: string): string {
  //   const task = this.getById(id);
  //   this.tasks = this.tasks.filter(() => task.id !== id);
  //   return `The task with this id => ${id} has been deleted.`;
  // }
  // updateTask(id: string, createTaskDto: CreateTaskDto): Task {
  //   const { title, description } = createTaskDto;
  //   let theTask = this.tasks.find((task) => task.id == id);
  //   this.tasks = this.tasks.filter((task) => task.id !== id);
  //   theTask = { title, description, status: TaskStatus.Open, id: id };
  //   this.tasks.push(theTask);
  //   return theTask;
  // }
}
