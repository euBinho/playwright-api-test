import { test, expect, APIResponse } from '@playwright/test';
import { faker } from '@faker-js/faker';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test.describe('API - Posts', () => {

  test('Deve listar todos os posts', async ({ request }) => {
    const response: APIResponse = await request.get(`${baseUrl}/posts`);
    expect(response.status()).toBe(200);

    const body: Array<{ id: number; title: string; body: string; userId: number }> = await response.json();
    expect(body.length).toBe(100);
  });

  test('Criar um novo post', async ({ request }) => {
    const newPost = {
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      userId: faker.number.int({ min: 1, max: 100 })
    };

    const response: APIResponse = await request.post(`${baseUrl}/posts`, { data: newPost });
    expect(response.status()).toBe(201);

    const body: { id: number; title: string; body: string; userId: number } = await response.json();
    expect(body).toMatchObject({
      title: newPost.title,
      body: newPost.body,
      userId: newPost.userId
    });
  });

  test('Atualizar um post existente', async ({ request }) => {
    const updatedPost = {
      title: faker.lorem.sentence(),
      body: faker.lorem.paragraph(),
      userId: faker.number.int({ min: 1, max: 10 })
    };

    const response: APIResponse = await request.put(`${baseUrl}/posts/1`, { data: updatedPost });
    expect(response.status()).toBe(200);

    const body: { id: number; title: string; body: string; userId: number } = await response.json();
    expect(body).toMatchObject({
      id: 1,
      title: updatedPost.title,
      body: updatedPost.body,
      userId: updatedPost.userId
    });
  });

  test('Deletar um post', async ({ request }) => {
    const response: APIResponse = await request.delete(`${baseUrl}/posts/1`);
    expect(response.status()).toBe(200);
  });

});
