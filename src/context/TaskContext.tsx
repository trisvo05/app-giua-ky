import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import { Task } from '../types/task';
import { sampleTasks } from '../data/sampleTasks';
import { loadTasks, saveTasks } from '../services/taskStorage';

type TaskInput = Omit<Task, 'id' | 'done'>;
interface TaskState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
  addTask: (input: TaskInput) => void;
  updateTask: (id: string, input: TaskInput) => void;
  toggleTask: (id: string) => void;
  deleteTask: (id: string) => void;
  deleteCompleted: () => void;
  retryLoad: () => void;
}

const TaskContext = createContext<TaskState | null>(null);
let nextId = 0;

export function TaskProvider({ children }: { children: React.ReactNode }) {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [loadAttempt, setLoadAttempt] = useState(0);
  const ready = useRef(false);
  const saveQueue = useRef<Promise<void>>(Promise.resolve());

  useEffect(() => {
    let active = true;
    ready.current = false;
    setLoading(true);
    loadTasks()
      .then(stored => {
        if (!active) {
          return;
        }
        setTasks(stored === null ? sampleTasks() : stored);
        setError(null);
        ready.current = true;
        setLoading(false);
      })
      .catch(() => {
        if (!active) {
          return;
        }
        setError('Không thể đọc dữ liệu đã lưu. Vui lòng thử lại.');
        setLoading(false);
      });
    return () => {
      active = false;
    };
  }, [loadAttempt]);

  useEffect(() => {
    if (!ready.current || loading) {
      return;
    }
    saveQueue.current = saveQueue.current
      .catch(() => undefined)
      .then(() => saveTasks(tasks));
    saveQueue.current.catch(() =>
      setError('Không thể lưu công việc. Vui lòng thử lại.'),
    );
  }, [tasks, loading]);

  const addTask = (input: TaskInput) =>
    setTasks(current => [
      { id: `${Date.now()}-${++nextId}`, ...input, done: false },
      ...current,
    ]);
  const updateTask = (id: string, input: TaskInput) =>
    setTasks(current =>
      current.map(task => (task.id === id ? { ...task, ...input } : task)),
    );
  const toggleTask = (id: string) =>
    setTasks(current =>
      current.map(task =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  const deleteTask = (id: string) =>
    setTasks(current => current.filter(task => task.id !== id));
  const deleteCompleted = () =>
    setTasks(current => current.filter(task => !task.done));

  return (
    <TaskContext.Provider
      value={{
        tasks,
        loading,
        error,
        addTask,
        updateTask,
        toggleTask,
        deleteTask,
        deleteCompleted,
        retryLoad: () => setLoadAttempt(value => value + 1),
      }}
    >
      {children}
    </TaskContext.Provider>
  );
}

export function useTasks(): TaskState {
  const value = useContext(TaskContext);
  if (!value) {
    throw new Error('TaskProvider is missing');
  }
  return value;
}
