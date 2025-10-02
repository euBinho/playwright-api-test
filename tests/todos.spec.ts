import { test, expect, APIResponse } from '@playwright/test';
import { faker } from '@faker-js/faker';

const baseUrl = 'https://jsonplaceholder.typicode.com';

test.describe('API - Todos', () => {

  test('Listar todos', async ({ request }) => {
    const response: APIResponse = await request.get(`${baseUrl}/todos`);
    expect(response.status()).toBe(200);

    const body: Array<{ id: number; title: string; completed: boolean; userId: number }> = await response.json();
    expect(body.length).toBeGreaterThan(0);
    expect(body[0]).toHaveProperty('completed');
  });

  test('Criar um novo todo', async ({ request }) => {
    const newTodo = { userId: faker.number.int({ min: 1, max: 10 }), title: faker.lorem.sentence(), completed: false };
    const response: APIResponse = await request.post(`${baseUrl}/todos`, { data: newTodo });
    expect(response.status()).toBe(201);

    const body: { id: number; userId: number; title: string; completed: boolean } = await response.json();
    expect(body).toHaveProperty('id');
    expect(body.completed).toBe(false);
  });

  test('Atualizar o status de um todo para concluído', async ({ request }) => {
    const response = await request.patch(`${baseUrl}/todos/1`, {
      data: { completed: true }
    });
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(body.completed).toBe(true);
  });

  test('Não deve retornar todo inexistente', async ({ request }) => {
    const response = await request.get(`${baseUrl}/todos/999999`);
    expect(response.status()).toBe(404);
  });

  test('Validar o schema de um todo', async ({ request }) => {
    const idNumber = faker.number.int({ min: 1, max: 200 });
    const response = await request.get(`${baseUrl}/todos/${idNumber}`);
    const body = await response.json();

    expect(body).toMatchObject({
      userId: expect.any(Number),
      id: expect.any(Number),
      title: expect.any(String),
      completed: expect.any(Boolean)
    });
  });

  test("Buscar todos os 'todos' de um usuário", async ({ request }) => {
    const userId = faker.number.int({ min: 1, max: 10 });
    const response = await request.get(`${baseUrl}/users/${userId}/todos`);
    expect(response.status()).toBe(200);

    const body = await response.json();
    expect(Array.isArray(body)).toBeTruthy();
    expect(body[0]).toHaveProperty('title');
  });

});
