export interface Task {
  id?: string;
  projectId: string;
  statusId: number;
  description: string;
  scheduleDate: Date;
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