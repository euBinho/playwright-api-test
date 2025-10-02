import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test.describe('API - Photos', () => {

  test('Listar todas as fotos', async ({ request }) => {
    const response = await request.get(`${baseUrl}/photos`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('url');
  });

  test('Buscar uma foto por ID', async ({ request }) => {
    const photoId = faker.number.int({ min: 1, max: 5000 });
    const response = await request.get(`${baseUrl}/photos/${photoId}`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body).toMatchObject({
      id: photoId,
      albumId: expect.any(Number),
      title: expect.any(String),
      url: expect.any(String),
      thumbnailUrl: expect.any(String),
    });
  });

  test('Retornar 404 ao buscar foto com ID inválido', async ({ request }) => {
    const invalidPhotoId = faker.number.int({ min: 5001, max: 10000 });
    const response = await request.get(`${baseUrl}/photos/${invalidPhotoId}`);
    expect(response.status()).toBe(404);
  });

  test('Listar fotos de um álbum específico', async ({ request }) => {
    const albumId = faker.number.int({ min: 1, max: 100 });
    const response = await request.get(`${baseUrl}/albums/${albumId}/photos`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.length).toBeGreaterThan(0);
    body.forEach((photo: any) => {
      expect(photo).toHaveProperty('albumId', albumId);
      expect(photo).toHaveProperty('id');
      expect(photo).toHaveProperty('title');
      expect(photo).toHaveProperty('url');
      expect(photo).toHaveProperty('thumbnailUrl');
    });
  });

});
