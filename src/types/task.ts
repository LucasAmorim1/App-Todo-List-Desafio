export interface TaskItem {
  id: string;
  userId: string;
  name: string;
  description?: string;
  done: boolean;
  createdAt: number;
}

export interface PieDataType {
  value: number;
  color: string;
  text: string;
}

export interface User {
  id: string;
  name: string;
  email: string;
  password: string;
}

export type FilterType = 'Concluído' | 'Pendente' | undefined;
