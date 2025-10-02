import { test, expect, APIResponse } from '@playwright/test';
import { faker } from '@faker-js/faker';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test.describe('API - Users', () => {

  test('Deve listar os usuários', async ({ request }) => {
    const response: APIResponse = await request.get(`${baseUrl}/users`);
    expect(response.status()).toBe(200);

    const body: Array<{ id: number; name: string; email: string }> = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body[0]).toHaveProperty('email');
  });

  test('Deve buscar usuário por ID', async ({ request }) => {
    const userId = faker.number.int({ min: 1, max: 10 });
    const response: APIResponse = await request.get(`${baseUrl}/users/${userId}`);
    expect(response.status()).toBe(200);

    const body: { id: number; name: string; email: string } = await response.json();
    expect(body.id).toBe(userId);
  });

  test('Deve validar o schema de um usuário', async ({ request }) => {
    const userId = faker.number.int({ min: 1, max: 10 });
    const response = await request.get(`${baseUrl}/users/${userId}`);
    const body = await response.json();

    expect(body).toMatchObject({
      id: expect.any(Number),
      name: expect.any(String),
      username: expect.any(String),
      email: expect.any(String),
      address: {
        street: expect.any(String),
        suite: expect.any(String),
        city: expect.any(String),
        zipcode: expect.any(String),
        geo: {
          lat: expect.any(String),
          lng: expect.any(String)
        }
      },
      phone: expect.any(String),
      website: expect.any(String),
      company: {
        name: expect.any(String),
        catchPhrase: expect.any(String),
        bs: expect.any(String)
      }
    });
  });

  test('Não deve retornar usuário inexistente', async ({ request }) => {
    const response = await request.get(`${baseUrl}/users/999999`);
    expect(response.status()).toBe(404);
  });

  test('Deve criar um usuário dinâmico', async ({ request }) => {
    const newUser = {
      name: faker.person.fullName(),
      username: faker.internet.username(),
      email: faker.internet.email(),
      phone: faker.phone.number(),
      website: faker.internet.domainName()
    };

    const response: APIResponse = await request.post(`${baseUrl}/users`, { data: newUser });
    expect(response.status()).toBe(201);

    const body = await response.json();
    expect(body).toMatchObject({
      name: newUser.name,
      username: newUser.username,
      email: newUser.email
    });
  });

});
