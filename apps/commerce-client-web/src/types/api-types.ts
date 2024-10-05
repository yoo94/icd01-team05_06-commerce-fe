export type ApiError = {
  message: string;
  code?: number;
};

export interface ApiResponse<Data> {
  success: boolean;
  data: Data | null;
  error: ApiError | null;
}
