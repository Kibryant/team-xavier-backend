import type {
  Feedback,
  FeedbackResponse,
  CreateFeedbackDto,
  CreateFeedbackResponseDto,
} from '../domain/feedback'
import type { FeedbackRepository } from '../repository/feedback-repository'

export class FeedbackRepositoryMock implements FeedbackRepository {
  private feedbacks: Feedback[] = []
  private feedbackResponses: FeedbackResponse[] = []

  async createFeedback(
    createFeedbackDto: CreateFeedbackDto
  ): Promise<Feedback> {
    const newFeedback: Feedback = {
      id: this.generateId(),
      ...createFeedbackDto,
      createdAt: new Date(),
      updatedAt: new Date(),
      response: [],
    }

    this.feedbacks.push(newFeedback)
    return newFeedback
  }

  async findFeedbacksByOwner(ownerId: string): Promise<Feedback[]> {
    return this.feedbacks.filter(feedback => feedback.ownerId === ownerId)
  }

  async findFeedbackByClient(clientId: string): Promise<Feedback[]> {
    return this.feedbacks.filter(feedback => feedback.clientId === clientId)
  }

  async addResponse(
    createFeedbackResponseDto: CreateFeedbackResponseDto
  ): Promise<FeedbackResponse> {
    const { feedbackId, userId, message } = createFeedbackResponseDto

    const feedback = this.feedbacks.find(fb => fb.id === feedbackId)

    if (!feedback) {
      throw new Error('Feedback not found')
    }

    const newResponse: FeedbackResponse = {
      id: this.generateId(),
      feedbackId,
      userId,
      message,
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    feedback.response?.push(newResponse)
    this.feedbackResponses.push(newResponse)
    feedback.updatedAt = new Date()

    return newResponse
  }

  private generateId(): string {
    return Math.random().toString(36).split('.')[1]
  }
}
