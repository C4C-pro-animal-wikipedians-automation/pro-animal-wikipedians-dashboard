export interface Task {
  id: string;
  title: string;
  completed: boolean;
}

export interface Article {
  id: string;
  title: string;
  date: string;
  tasks: Task[];
}
