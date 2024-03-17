import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { Task } from './tasks.model';
import { Console } from 'console';
import { CreateTaskDto } from './dto/create-task.dto';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  @Get('/getAll')
  getAllTasks(): Task[] {
    return this.tasksService.getAllTasks();
  }

  @Post('/create')
  createTask(@Body() dto: CreateTaskDto): Task {
    return this.tasksService.createTasks(dto);
  }

  @Get('/:id')
  getById(@Param('id') id: string): Task {
    return this.tasksService.getById(id);
  }

  @Delete('/:id')
  deleteTask(@Param('id') id: string): string {
    return this.deleteTask(id);
  }
}
