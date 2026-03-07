const request = require('supertest');
const app = require('../../src/app');
const { createUser } = require('../factories/user.factory');

describe('Auth Routes', () => {
    test('should register a new user', async() => {
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'Password@123'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);    
        expect(res.body.data).toHaveProperty('token');
    });

    test('should not register with existing email', async() => {
        await createUser();
        const res = await request(app)
            .post('/api/auth/register')
            .send({
                name: 'Test User',
                email: 'test@example.com',
                password: 'Password@123'
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });

    test('should login an existing user', async() => {
        await createUser();
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'Password@123'
            });
        
        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('token');
    });

    test('should not login with wrong password', async() => {
        await createUser();
        const res = await request(app)
            .post('/api/auth/login')
            .send({
                email: 'test@example.com',
                password: 'WrongPassword@123'
            });

        expect(res.statusCode).toBe(400);
        expect(res.body.success).toBe(false);
    });
});