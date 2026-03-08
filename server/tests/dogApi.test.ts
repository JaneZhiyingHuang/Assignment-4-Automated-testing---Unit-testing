import { describe, expect, test } from 'vitest';
import request from 'supertest';
import { app } from '../index';

//test 1
describe('Dog API Tests', () => {
  test('Test 1. Create positive API test that call API to get random dog image', async () => {
    const response = await request(app).get('/api/dogs/random');

    expect(response.status).toBe(200);
    expect(response.body.success).toBe(true);
    expect(response.body).toHaveProperty('data');
    expect(response.body.data).toHaveProperty('imageUrl');
    expect(typeof response.body.data.imageUrl).toBe('string');
  });

//test 2
  test('Test 2. Invalid route', async () => {
    const response = await request(app).get('/api/dogs/invalid');

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty('error');
    expect(typeof response.body.error).toBe('string');
  });
});