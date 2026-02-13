export type TaskStatus = "open" | "done";

// this is based on what backend will return and what will be its type. This is for task
export interface Task {
  _id: string;
  transcriptId: string;
  task: string;
  owner: string | null;
  dueDate: string | null;
  status: TaskStatus;
  createdAt: string;
  updatedAt: string;
}