import * as request from '~/utils/request';

export const getAllStories = async (params) => {
    try {
        const res = await request.get('/stories', {
            params
        });
        return res;
    } catch (error) {
        console.error('Error fetching stories:', error);
        throw error;
    }
};

export const getStoryById = async (id) => {
    try {
        const res = await request.get(`/stories/${id}`);
        return res;
    } catch (error) {
        console.error(`Error fetching story ${id}:`, error);
        throw error;
    }
};

export const getStoriesByType = async (type) => {
    try {
        const res = await request.get(`/stories/type/${type}`);
        return res;
    } catch (error) {
        console.error(`Error fetching stories by type ${type}:`, error);
        throw error;
    }
};

export const searchStories = async (keyword) => {
    try {
        const res = await request.get('/stories/search', {
            params: { tukhoa: keyword }
        });
        return res;
    } catch (error) {
        console.error('Error searching stories:', error);
        throw error;
    }
};
