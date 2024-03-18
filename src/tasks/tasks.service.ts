import { Injectable, NotFoundException } from '@nestjs/common';
import { Task, TaskStatus } from './tasks.model';
import { v4 as uuid } from 'uuid';
import { CreateTaskDto } from './dto/create-task.dto';

@Injectable()
export class TasksService {
  private tasks: Task[] = [];

  getAllTasks(): Task[] {
    return this.tasks;
  }
  createTasks(createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    const task: Task = {
      id: uuid(),
      title,
      description,
      status: TaskStatus.Open,
    };
    this.tasks.push(task);
    return task;
  }

  getById(id: string): Task {
    const task = this.tasks.find((task) => task.id == id);
    if (!task) {
      throw new NotFoundException(`The task with the id of ${id} not found!`);
    }
    return task;
  }

  deleteTask(id: string): string {
    const task = this.getById(id);
    this.tasks = this.tasks.filter(() => task.id !== id);
    return `The task with this id => ${id} has been deleted.`;
  }

  updateTask(id: string, createTaskDto: CreateTaskDto): Task {
    const { title, description } = createTaskDto;
    let theTask = this.tasks.find((task) => task.id == id);
    this.tasks = this.tasks.filter((task) => task.id !== id);
    theTask = { title, description, status: TaskStatus.Open, id: id };
    this.tasks.push(theTask);
    return theTask;
  }
}
