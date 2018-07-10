export interface Task {
  id?: string;
  projectId: string;
  statusId: number;
  description: string;
  scheduleDate: Date;
  ordinal: number;
}