const routes = {
    home: '/',
    story: '/story/:id', // thêm :id để nhận id truyện
    chapter: '/story/:storyId/chapter/:chapterNum', // chapter động
    login: '/login',
    register: '/register',
    history: '/history/:userid', // Lịch sử đọc của người dùng
    settings: '/settings/:userId', // Cài đặt của người dùng
    adminData: '/admin/data',
    profile: '/profile',
    search: '/search',
    category: '/category/:category',
    categoryAll: '/category',
    adminStories: '/admin/stories',
    adminAddChapter: '/admin/add-chapter/:storyId',
    adminEditStory: '/admin/edit-story/:storyId',
    adminEditChapter: '/admin/edit-chapter/:storyId/:chapternum',
}

export default routes;