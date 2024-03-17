import { Module } from '@nestjs/common';
import { TasksModule } from './tasks/tasks.module';
import { TaskscontrollerController } from './taskscontroller/taskscontroller.controller';

@Module({
  imports: [TasksModule],
  controllers: [TaskscontrollerController],
})
export class AppModule {}
