export interface Task {
  id: string;
  projectId: string;
  statusId: string;
  description: string;
  scheduleDate: Date;
}