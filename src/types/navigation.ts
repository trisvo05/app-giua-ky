export type RootStackParamList = {
  TaskList: undefined;
  TaskDetail: { taskId: string };
  TaskForm: { taskId?: string } | undefined;
};
