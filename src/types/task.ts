export type TaskCategory = 'Học tập' | 'Công việc' | 'Sức khoẻ' | 'Cá nhân';
export type TaskPriority = 'Cao' | 'Trung bình' | 'Thấp';

export interface Task {
  id: string;
  title: string;
  note: string;
  category: TaskCategory;
  priority: TaskPriority;
  dueDate: string;
  done: boolean;
}

export const categories: TaskCategory[] = [
  'Học tập',
  'Công việc',
  'Sức khoẻ',
  'Cá nhân',
];
export const priorities: TaskPriority[] = ['Cao', 'Trung bình', 'Thấp'];
