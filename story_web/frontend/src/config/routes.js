const routes = {
    home: '/',
    story: '/story/:id', // thêm :id để nhận id truyện
    chapter: '/story/:storyId/chapter/:chapterId', // chapter động
    login: '/login',
    register: '/register',
    category: '/category/:category',
    search: '/search',
    profile: '/profile',
}

export default routes;