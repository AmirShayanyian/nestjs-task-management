import { Module } from '@nestjs/common';
import { TasksService } from './tasks.service';
import { TasksController } from './tasks.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Task } from './task.entity';
import { TaskRepository } from './tasks.repository';

@Module({
  imports: [TypeOrmModule.forFeature([Task])],
  providers: [TasksService, TaskRepository],
  controllers: [TasksController],
})
export class TasksModule {}
