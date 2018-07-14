export interface Project {
  id?: string;
  name: string;
  color?: string;
  ordinal?: number;
}

export interface UserProject {
  userId?: string;
  projectId: string;
}