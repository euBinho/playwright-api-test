import { test, expect, APIResponse } from '@playwright/test';
import { faker } from '@faker-js/faker';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test.describe('API - Albums', () => {

  test('Listar álbuns', async ({ request }) => {
    const response: APIResponse = await request.get(`${baseUrl}/albums`);
    expect(response.status()).toBe(200);

    const body: Array<{ id: number; userId: number; title: string }> = await response.json();
    expect(body.length).toBeGreaterThan(0);
  });

  test('Criar um novo álbum', async ({ request }) => {
    const newAlbum = {
      userId: faker.number.int({ min: 1, max: 100 }),
      title: faker.lorem.words(3)
    };
    const response: APIResponse = await request.post(`${baseUrl}/albums`, { data: newAlbum });
    expect(response.status()).toBe(201);

    const body: { id: number; userId: number; title: string } = await response.json();
    expect(body).toHaveProperty('id');
  });

  test('Listar álbuns de um usuário específico', async ({ request }) => {
    const userId = faker.number.int({ min: 1, max: 10 });
    const response = await request.get(`${baseUrl}/users/${userId}/albums`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body[0]).toHaveProperty('userId', userId);
  });

  test('Não deve retornar álbum inexistente', async ({ request }) => {
    const albumId = faker.number.int({ min: 1000, max: 9999 });
    const response = await request.get(`${baseUrl}/albums/${albumId}`);
    expect(response.status()).toBe(404);
  });

  test('Validar o schema de um álbum', async ({ request }) => {
    const idNumber = faker.number.int({ min: 1, max: 100 });
    const response = await request.get(`${baseUrl}/albums/${idNumber}`);
    expect(response.status()).toBe(200);

    const body: { userId: number; id: number; title: string } = await response.json();
    expect(body).toMatchObject({
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String)
    });
  });

  test('Atualizar o título de um álbum', async ({ request }) => {
    const updatedTitle = { title: faker.lorem.words(4) };
    const response: APIResponse = await request.put(`${baseUrl}/albums/1`, { data: updatedTitle });
    expect(response.status()).toBe(200);

    const body: { userId: number; id: number; title: string } = await response.json();
    expect(body).toHaveProperty('title', updatedTitle.title);
  });

});
