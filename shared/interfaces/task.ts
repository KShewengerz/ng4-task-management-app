export interface Task {
  id?: string;
  projectId: string;
  statusId: number;
  description: string;
  scheduleDate: string;
  ordinal: number;
}

export interface TaskStatus {
  id: number;
  name: string;
}

export interface UserTask {
  userId: string;
  taskId: string;
}