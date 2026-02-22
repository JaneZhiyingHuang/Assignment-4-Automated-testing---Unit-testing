import { describe, expect, test, vi, beforeEach } from 'vitest';
import { getDogImage } from '../controllers/dogController';
import * as dogService from '../services/dogService';

vi.mock('../services/dogService');

describe('dogController', () => {
  beforeEach(() => {
    vi.restoreAllMocks();
  });

  test('Test 3: create positive test for dogController', async () => {
    const mockServiceResponse = {
      imageUrl: 'https://images.dog.ceo/breeds/terrier-welsh/lucy.jpg',
      status: 'success'
    };

    vi.mocked(dogService.getRandomDogImage).mockResolvedValue(mockServiceResponse);

    const req = {} as any;
    const res = {
      status: vi.fn().mockReturnThis(),
      json: vi.fn()
    } as any;

    await getDogImage(req, res);

    expect(res.json).toHaveBeenCalledWith({
      success: true,
      data: mockServiceResponse
    });
  });
});