import { TaskStatus } from '../tasks-status.enum';

export class TasksFilterDto {
  status: TaskStatus;
  title;
}
