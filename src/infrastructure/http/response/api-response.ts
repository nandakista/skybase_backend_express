export interface ApiResponse<T = unknown> {
  success: boolean;
  message: string;
  status: number;
  error?: string;
  data?: T;
}