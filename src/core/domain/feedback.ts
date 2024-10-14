export interface Feedback {
  id: string
  clientId: string
  ownerId: string
  message: string
  rating?: number
  response?: FeedbackResponse[]
  createdAt: Date
  updatedAt?: Date
}

export interface CreateFeedbackDto {
  clientId: string
  ownerId: string
  message: string
  rating?: number
}

export interface FeedbackResponse {
  id: string
  feedbackId: string
  userId: string
  message: string
  createdAt: Date
  updatedAt?: Date
}

export interface CreateFeedbackResponseDto {
  feedbackId: string
  userId: string
  message: string
}
