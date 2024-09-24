export type ApiError = {
  message: string;
  code?: number;
};

export interface ApiResponse<Data> {
  success: boolean;
  data: Data;
  error: ApiError | null;
}
