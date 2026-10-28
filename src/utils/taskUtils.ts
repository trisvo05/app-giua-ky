import { Task } from '../types/task';
import { daysUntil, parseDate } from './dateUtils';

export type StatusFilter = 'Tất cả' | 'Chưa xong' | 'Đã xong' | 'Quá hạn';
export type SortMode = 'date' | 'priority';
export const filters: StatusFilter[] = [
  'Tất cả',
  'Chưa xong',
  'Đã xong',
  'Quá hạn',
];

export function isOverdue(task: Task, today = new Date()): boolean {
  return !task.done && daysUntil(task.dueDate, today) < 0;
}

const rank = { Cao: 0, 'Trung bình': 1, Thấp: 2 };
export function selectTasks(
  tasks: Task[],
  filter: StatusFilter,
  query: string,
  sort: SortMode,
  today = new Date(),
): Task[] {
  const term = query.trim().toLocaleLowerCase('vi');
  return tasks
    .filter(task => {
      const statusMatches =
        filter === 'Tất cả' ||
        (filter === 'Chưa xong' && !task.done) ||
        (filter === 'Đã xong' && task.done) ||
        (filter === 'Quá hạn' && isOverdue(task, today));
      return statusMatches && task.title.toLocaleLowerCase('vi').includes(term);
    })
    .sort((a, b) => {
      const byDate =
        (parseDate(a.dueDate)?.getTime() ?? 0) -
        (parseDate(b.dueDate)?.getTime() ?? 0);
      return sort === 'priority'
        ? rank[a.priority] - rank[b.priority] || byDate
        : byDate;
    });
}
