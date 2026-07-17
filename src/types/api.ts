export interface ApiError {
  status: number;
  message: string;
  timestamp: string;
  errors?: Record<string, string[]>;
}

export interface ApiSuccess<T> {
  data: T;
  message?: string;
}
