export interface TaskResponseDto {
  id: string
  title: string
  description: string | null
  status: string
  userId: string
  createdAt: Date
  updatedAt: Date
}
