import { Task } from '../types/task';
import { addDays, formatDate } from '../utils/dateUtils';

export function sampleTasks(today = new Date()): Task[] {
  const due = (offset: number) => formatDate(addDays(today, offset));
  return [
    {
      id: 'sample-1',
      title: 'Ôn tập bài kiểm tra',
      note: 'Xem lại các nội dung quan trọng.',
      category: 'Học tập',
      priority: 'Cao',
      dueDate: due(2),
      done: false,
    },
    {
      id: 'sample-2',
      title: 'Hoàn thiện báo cáo',
      note: 'Kiểm tra phần kết luận.',
      category: 'Công việc',
      priority: 'Cao',
      dueDate: due(-2),
      done: false,
    },
    {
      id: 'sample-3',
      title: 'Đi bộ 30 phút',
      note: '',
      category: 'Sức khoẻ',
      priority: 'Thấp',
      dueDate: due(1),
      done: true,
    },
    {
      id: 'sample-4',
      title: 'Gọi điện cho gia đình',
      note: '',
      category: 'Cá nhân',
      priority: 'Trung bình',
      dueDate: due(3),
      done: false,
    },
    {
      id: 'sample-5',
      title: 'Đọc tài liệu dự án',
      note: 'Đọc chương mới.',
      category: 'Học tập',
      priority: 'Trung bình',
      dueDate: due(5),
      done: false,
    },
    {
      id: 'sample-6',
      title: 'Khám sức khoẻ định kỳ',
      note: '',
      category: 'Sức khoẻ',
      priority: 'Thấp',
      dueDate: due(7),
      done: false,
    },
  ];
}
