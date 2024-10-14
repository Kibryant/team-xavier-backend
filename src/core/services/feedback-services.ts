import type {
  CreateFeedbackDto,
  Feedback,
  CreateFeedbackResponseDto,
  FeedbackResponse,
} from '../domain/feedback'
import type { FeedbackRepository } from '../repository/feedback-repository'

export class FeedbackService {
  private feedbackRepository: FeedbackRepository

  constructor(feedbackRepository: FeedbackRepository) {
    this.feedbackRepository = feedbackRepository
  }

  async createFeedback(
    createFeedbackDto: CreateFeedbackDto
  ): Promise<Feedback> {
    const feedback =
      await this.feedbackRepository.createFeedback(createFeedbackDto)
    return feedback
  }

  async getFeedbacksByOwner(ownerId: string): Promise<Feedback[]> {
    const feedbacks =
      await this.feedbackRepository.findFeedbacksByOwner(ownerId)
    return feedbacks
  }

  async addResponse(
    createFeedbackResponseDto: CreateFeedbackResponseDto
  ): Promise<FeedbackResponse> {
    const response = await this.feedbackRepository.addResponse(
      createFeedbackResponseDto
    )
    return response
  }
}
