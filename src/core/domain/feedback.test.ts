import { describe, it, expect } from 'bun:test'

import type { Feedback, FeedbackResponse } from './feedback'

describe('Feedback', () => {
  it('should be a entity feedback', () => {
    const feedback: Feedback = {
      id: '1',
      ownerId: '1',
      clientId: '1',
      rating: 5,
      message: 'Great app!',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    expect(feedback).toEqual({
      id: '1',
      clientId: '1',
      rating: 5,
      message: 'Great app!',
      createdAt: new Date(),
      updatedAt: new Date(),
      ownerId: '1',
    })
  })

  it('should be a entity feedback without rating', () => {
    const feedback: Feedback = {
      id: '1',
      ownerId: '1',
      clientId: '1',
      message: 'Great app!',
      createdAt: new Date(),
    }

    expect(feedback).toEqual({
      id: '1',
      clientId: '1',
      message: 'Great app!',
      createdAt: new Date(),
      ownerId: '1',
    })
  })

  it('should be a entity feedback response', () => {
    const feedbackResponse: FeedbackResponse = {
      id: '1',
      feedbackId: '1',
      userId: '1',
      message: 'Great app!',
      createdAt: new Date(),
      updatedAt: new Date(),
    }

    expect(feedbackResponse).toEqual({
      id: '1',
      feedbackId: '1',
      userId: '1',
      message: 'Great app!',
      createdAt: new Date(),
      updatedAt: new Date(),
    })
  })
})
