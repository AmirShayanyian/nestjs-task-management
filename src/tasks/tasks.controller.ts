import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TasksService } from './tasks.service';
import { CreateTaskDto } from './dto/create-task.dto';
import { Task } from './task.entity';

@Controller('tasks')
export class TasksController {
  constructor(private tasksService: TasksService) {}

  // @Get('/getAll')
  // getAllTasks(): Task[] {
  //   return this.tasksService.getAllTasks();
  // }

  // @Post('/create')
  // createTask(@Body() dto: CreateTaskDto): Task {
  //   return this.tasksService.createTasks(dto);
  // }
  @Post('/createTask')
  createTask(@Body() dto: CreateTaskDto): Promise<Task> {
    return this.tasksService.createTask(dto);
  }

  // @Get('/:id')
  // getById(@Param('id') id: string): Task {
  //   return this.tasksService.getById(id);
  // }
  @Get('/:id')
  getTaskById(@Param('id') id: string): Promise<Task> {
    return this.tasksService.getTaskById(id);
  }
  // @Delete('/:id')
  // deleteTask(@Param('id') id: string): string {
  //   return this.tasksService.deleteTask(id);
  // }

  // @Put('/update/:id')
  // updateTask(@Param('id') id: string, @Body() dto: CreateTaskDto): Task {
  //   return this.tasksService.updateTask(id, dto);
  // }
}
