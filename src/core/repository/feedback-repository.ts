import type {
  CreateFeedbackDto,
  Feedback,
  CreateFeedbackResponseDto,
  FeedbackResponse,
} from '../domain/feedback'

export interface FeedbackRepository {
  createFeedback(createFeedbackDto: CreateFeedbackDto): Promise<Feedback>
  findFeedbacksByOwner(ownerId: string): Promise<Feedback[]>
  findFeedbackByClient(clientId: string): Promise<Feedback[]>
  addResponse(
    createFeedbackResponseDto: CreateFeedbackResponseDto
  ): Promise<FeedbackResponse>
}
