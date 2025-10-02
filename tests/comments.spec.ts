import { test, expect, APIResponse } from '@playwright/test';
import { faker } from '@faker-js/faker';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test.describe('API - Comments', () => {

  test('Listar comentários', async ({ request }) => {
    const response: APIResponse = await request.get(`${baseUrl}/comments`);
    expect(response.status()).toBe(200);

    const body: Array<{ id: number; name: string; email: string; body: string }> = await response.json();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('email');
  });

  test('Buscar comentário por ID', async ({ request }) => {
    const numberId = faker.number.int({ min: 1, max: 500 });
    const response: APIResponse = await request.get(`${baseUrl}/comments/${numberId}`);
    expect(response.status()).toBe(200);

    const body: { id: number; name: string; email: string; body: string } = await response.json();
    expect(body.id).toBe(numberId);
  });

  test('Listar comentários de um post específico', async ({ request }) => {
    const postId = faker.number.int({ min: 1, max: 100 });
    const response = await request.get(`${baseUrl}/posts/${postId}/comments`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('postId', postId);
  });

  test('Não deve retornar comentário inexistente', async ({ request }) => {
    const numberId = faker.number.int({ min: 500, max: 999999 });
    const response = await request.get(`${baseUrl}/comments/${numberId}`);
    expect(response.status()).toBe(404);
  });

  test('Criar um novo comentário', async ({ request }) => {
    const newComment = {
      postId: faker.number.int({ min: 1, max: 100 }),
      name: faker.lorem.words(3),
      email: faker.internet.email(),
      body: faker.lorem.sentences(2)
    };

    const response: APIResponse = await request.post(`${baseUrl}/comments`, { data: newComment });
    expect(response.status()).toBe(201);

    const body: { id: number; postId: number; name: string; email: string; body: string } = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.postId).toBe(newComment.postId);
  });

  test('Validar o schema de um comentário', async ({ request }) => {
    const idNumber = faker.number.int({ min: 1, max: 500 });
    const response = await request.get(`${baseUrl}/comments/${idNumber}`);
    const body = await response.json();

    expect(body).toMatchObject({
      postId: expect.any(Number),
      id: expect.any(Number),
      name: expect.any(String),
      email: expect.any(String),
      body: expect.any(String)
    });
  });
});
