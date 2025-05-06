const routes = {
    home: '/',
    story: '/story/:id', // thêm :id để nhận id truyện
    chapter: '/story/:storyId/chapter/:chapterNum', // chapter động
    login: '/login',
    register: '/register',
    category: '/category/:category',
    categoryAll: '/category',
    search: '/search',
    profile: '/profile',
}

export default routes;