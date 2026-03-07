const request = require('supertest');
const app = require('../../src/app');
const { createUser } = require('../factories/user.factory');
const { createUrl } = require('../factories/url.factory');
const { generateToken } = require('../../src/utils/jwt');

describe('URL routes', () => {
    test('should create a new short url', async() => {
        const user = await createUser();
        const token = generateToken({ id: user._id });

        const res = await request(app)
            .post('/api/url/create')
            .set('Authorization', `Bearer ${token}`)
            .send({
                inputUrl: 'https://www.google.com',
                isCustom: true,
                customShortCode: 'test123'
            });

        expect(res.statusCode).toBe(201);
        expect(res.body.success).toBe(true);
    });

    test('should redirect to original url', async() => {
        const user = await createUser();
        const url = await createUrl(user._id);

        const res = await request(app)
            .get(`/r/${url.shortUrl}`);

        expect(res.statusCode).toBe(302);
        expect(res.headers.location).toBe(url.originalUrl);
    });

    test('should return 404 for non-existent short url', async() => {
        const res = await request(app)
            .get('/r/nonexistent');
        
        expect(res.statusCode).toBe(404);
    });

    test('should delete a url', async() => {
        const user = await createUser();
        const url = await createUrl(user._id);
        const token = generateToken({ id: user._id });

        const res = await request(app)
            .delete(`/api/url/${url._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
    });

    test('should return 404 when deleting others url', async() => {
        const user1 = await createUser({ email: 'user1@example.com' });
        const user2 = await createUser({ email: 'user2@example.com' });
        const url = await createUrl(user1._id);
        const token = generateToken({ id: user2._id });

        const res = await request(app)
            .delete(`/api/url/${url._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(404);
    });

    test('should toggle a url', async() => {
        const user = await createUser();
        const url = await createUrl(user._id);
        const token = generateToken({ id: user._id });

        const res = await request(app)
            .patch(`/api/url/${url._id}/toggle`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.message).toBe('URL disabled successfully');

        const res2 = await request(app)
            .get(`/r/${url.shortUrl}`);
        
        expect(res2.statusCode).toBe(404);
    });

    test('should get all urls for a user', async() => {
        const user = await createUser();
        const token = generateToken({ id: user._id });
        await createUrl(user._id);
        await createUrl(user._id, { shortUrl: 'test456' });

        const res = await request(app)
            .get('/api/url/get/all')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data.urls.length).toBe(2);
    });
});