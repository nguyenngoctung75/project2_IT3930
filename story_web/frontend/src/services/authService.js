import * as request from '~/utils/request';

export const login = async (email, password) => {
    try {
        const res = await request.post('/auth/login', { email, password });
        return res;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
};

export const register = async (username, email, password) => {
    try {
        const res = await request.post('/auth/register', { username, email, password });
        return res;
    } catch (error) {
        console.error('Register error:', error);
        throw error;
    }
};
