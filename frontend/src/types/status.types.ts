// response from the status route for that we have types here which will come from the backend

export interface BackendStatus {
  backend: string;
  database: string;
  llm?: string;
}