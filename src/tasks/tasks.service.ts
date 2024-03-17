import { Injectable } from '@nestjs/common';
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
    return this.tasks.find((task) => task.id == id);
  }

  deleteTask(id: string): string {
    this.tasks = this.tasks.filter((task) => task.id !== id);
    return `The task with this id => ${id} has been deleted.`;
  }
}
