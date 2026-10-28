import AsyncStorage from '@react-native-async-storage/async-storage';
import { Task } from '../types/task';

const STORAGE_KEY = '@PlannerApp:tasks';

export async function loadTasks(): Promise<Task[] | null> {
  const value = await AsyncStorage.getItem(STORAGE_KEY);
  if (value === null) {
    return null;
  }
  const parsed: unknown = JSON.parse(value);
  if (!Array.isArray(parsed)) {
    throw new Error('Dữ liệu công việc không hợp lệ.');
  }
  return parsed as Task[];
}

export async function saveTasks(tasks: Task[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(tasks));
}
