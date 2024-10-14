import { describe, it, expect, beforeEach } from 'bun:test'
import type {
  CreateFeedbackDto,
  CreateFeedbackResponseDto,
} from '../domain/feedback'
import type { FeedbackRepository } from './feedback-repository'
import { FeedbackRepositoryMock } from '../mocks/feedback-repository-mock'

describe('FeedbackRepositoryMock', () => {
  let feedbackRepository: FeedbackRepository

  beforeEach(() => {
    feedbackRepository = new FeedbackRepositoryMock()
  })

  it('should create a new feedback', async () => {
    const createFeedbackDto: CreateFeedbackDto = {
      clientId: 'client123',
      ownerId: 'owner123',
      message: 'Great session!',
      rating: 5,
    }

    const feedback = await feedbackRepository.createFeedback(createFeedbackDto)

    expect(feedback).toBeDefined()
    expect(feedback.clientId).toBe('client123')
    expect(feedback.ownerId).toBe('owner123')
    expect(feedback.message).toBe('Great session!')
    expect(feedback.rating).toBe(5)
    expect(feedback.response).toHaveLength(0)
  })

  it('should find feedbacks by ownerId', async () => {
    const createFeedbackDto: CreateFeedbackDto = {
      clientId: 'client123',
      ownerId: 'owner123',
      message: 'Nice workout!',
    }

    await feedbackRepository.createFeedback(createFeedbackDto)
    const feedbacks = await feedbackRepository.findFeedbacksByOwner('owner123')

    expect(feedbacks).toHaveLength(1)
    expect(feedbacks[0].message).toBe('Nice workout!')
  })

  it('should find feedbacks by clientId', async () => {
    const createFeedbackDto: CreateFeedbackDto = {
      clientId: 'client123',
      ownerId: 'owner123',
      message: 'Great session!',
    }

    await feedbackRepository.createFeedback(createFeedbackDto)
    const feedbacks = await feedbackRepository.findFeedbackByClient('client123')

    expect(feedbacks).toHaveLength(1)
    expect(feedbacks[0].message).toBe('Great session!')
  })

  it('should add a response to a feedback', async () => {
    const createFeedbackDto: CreateFeedbackDto = {
      clientId: 'client123',
      ownerId: 'owner123',
      message: 'Session was great!',
    }

    const feedback = await feedbackRepository.createFeedback(createFeedbackDto)

    const createFeedbackResponseDto: CreateFeedbackResponseDto = {
      feedbackId: feedback.id,
      userId: 'owner123',
      message: 'Thanks for the feedback!',
    }

    const response = await feedbackRepository.addResponse(
      createFeedbackResponseDto
    )

    expect(response).toBeDefined()
    expect(response.feedbackId).toBe(feedback.id)
    expect(response.message).toBe('Thanks for the feedback!')

    const updatedFeedback =
      await feedbackRepository.findFeedbacksByOwner('owner123')
    expect(updatedFeedback[0].response).toHaveLength(1)
    expect(updatedFeedback[0].response).toBeDefined()
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    expect(updatedFeedback[0].response![0]).toBeDefined()
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    expect(updatedFeedback[0].response![0].message).toBe(
      'Thanks for the feedback!'
    )
  })

  it('shold add a response to another response', async () => {
    const createFeedbackDto: CreateFeedbackDto = {
      clientId: 'client123',
      ownerId: 'owner123',
      message: 'Session was great!',
    }

    const feedback = await feedbackRepository.createFeedback(createFeedbackDto)

    const createFeedbackResponseDto: CreateFeedbackResponseDto = {
      feedbackId: feedback.id,
      userId: 'owner123',
      message: 'Thanks for the feedback!',
    }

    await feedbackRepository.addResponse(createFeedbackResponseDto)

    const createFeedbackResponseDto2: CreateFeedbackResponseDto = {
      feedbackId: feedback.id,
      userId: 'owner123',
      message: 'You are welcome!',
    }

    const response2 = await feedbackRepository.addResponse(
      createFeedbackResponseDto2
    )

    expect(response2).toBeDefined()
    expect(response2.feedbackId).toBe(feedback.id)
    expect(response2.message).toBe('You are welcome!')

    const updatedFeedback =
      await feedbackRepository.findFeedbacksByOwner('owner123')
    expect(updatedFeedback[0].response).toHaveLength(2)
    expect(updatedFeedback[0].response).toBeDefined()
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    expect(updatedFeedback[0].response![1]).toBeDefined()
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    expect(updatedFeedback[0].response![0].message).toBe(
      'Thanks for the feedback!'
    )
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    expect(updatedFeedback[0].response![1].message).toBe('You are welcome!')
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    expect(updatedFeedback[0].response![1].userId).toBe('owner123')
    // biome-ignore lint/style/noNonNullAssertion: <explanation>
    expect(updatedFeedback[0].response![1].feedbackId).toBe(feedback.id)

    const createFeedbackResponseDto3: CreateFeedbackResponseDto = {
      feedbackId: feedback.id,
      userId: 'client123',
      message: 'I am glad you liked it!',
    }

    const response3 = await feedbackRepository.addResponse(
      createFeedbackResponseDto3
    )

    expect(response3).toBeDefined()
    expect(response3.feedbackId).toBe(feedback.id)
    expect(response3.message).toBe('I am glad you liked it!')
  })

  it('should throw an error when trying to add response to non-existing feedback', async () => {
    const createFeedbackResponseDto: CreateFeedbackResponseDto = {
      feedbackId: 'non-existing-id',
      userId: 'owner123',
      message: 'This will fail!',
    }

    expect(
      feedbackRepository.addResponse(createFeedbackResponseDto)
    ).rejects.toThrow('Feedback not found')
  })
})
