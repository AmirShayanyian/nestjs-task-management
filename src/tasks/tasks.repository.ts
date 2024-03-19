import { Repository } from 'typeorm';
import { Task } from './task.entity';
import { TasksFilterDto } from './dto/tasks-filter.dto';
import { InjectRepository } from '@nestjs/typeorm';

export class TaskRepository extends Repository<Task> {
  constructor(
    @InjectRepository(Task)
    private taskRepository: Repository<Task>,
  ) {
    super(
      taskRepository.target,
      taskRepository.manager,
      taskRepository.queryRunner,
    );
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
}
