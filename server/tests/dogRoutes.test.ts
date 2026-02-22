import { describe, expect, test, vi, beforeEach } from 'vitest';
import request from 'supertest';
import { app } from '../index';
import * as dogController from '../controllers/dogController';

vi.mock('../controllers/dogController');

describe('dogRoutes', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('Test 4: create positive test for dogRoutes', async () => {
    const mockJsonResponse = {
      success: true,
      data: {
        imageUrl: "https://images.dog.ceo/breeds/stbernard/n02109525_15579.jpg",
        status: "success"
      }
    };

    vi.mocked(dogController.getDogImage).mockImplementation((req, res) => {
      res.status(200).json(mockJsonResponse);
    });

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body.data.imageUrl).toBe(mockJsonResponse.data.imageUrl);
  });

  test('Test 5: create negative test returning 500', async () => {
    const mockErrorResponse = {
      success: false,
      error: "Failed to fetch dog image: Network error"
    };

    vi.mocked(dogController.getDogImage).mockImplementation((req, res) => {
      res.status(500).json(mockErrorResponse);
    });

    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(500);
    expect(response.body.error).toBe(mockErrorResponse.error);
  });
});