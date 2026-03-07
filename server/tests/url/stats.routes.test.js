const request = require('supertest');
const app = require('../../src/app');
const { createUser } = require('../factories/user.factory');
const { createUrl } = require('../factories/url.factory');
const { generateToken } = require('../../src/utils/jwt');

describe('URL stats routes', () => {
    test('should get stats for all urls', async() => {
        const user = await createUser();
        await createUrl(user._id);
        await createUrl(user._id, { shortUrl: 'test456' });
        const token = generateToken({ id: user._id });

        const res = await request(app)
            .get('/api/url/stats/all')
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('stats');
    });

    test('should get stats for a specific url(above free tier)', async() => {
        const user = await createUser();
        const url = await createUrl(user._id);
        const token = generateToken({ id: user._id });

        const res = await request(app)
            .get(`/api/url/stats/${url._id}`)
            .set('Authorization', `Bearer ${token}`);

        expect(res.statusCode).toBe(200);
        expect(res.body.success).toBe(true);
        expect(res.body.data).toHaveProperty('stats');

        const user2 = await createUser({ email: 'test2@example.com', plan: 'free' });
        const url2 = await createUrl(user2._id, { shortUrl: 'test789' });
        const token2 = generateToken({ id: user2._id });

        const res2 = await request(app)
            .get(`/api/url/stats/${url2._id}`)
            .set('Authorization', `Bearer ${token2}`);

        expect(res2.statusCode).toBe(403);
        expect(res2.body.success).toBe(false);
    });
});