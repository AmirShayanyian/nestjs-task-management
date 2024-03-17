import { Injectable } from '@nestjs/common';

@Injectable()
export class TasksService {
  private tasks = ['HI', 'sad'];
  getAllTasks() {
    return this.tasks;
  }
}
