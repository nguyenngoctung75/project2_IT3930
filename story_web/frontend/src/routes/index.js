import config from "~/config";
import Home from "~/pages/Home";
import Story from "~/pages/Story";
import Chapter from "~/pages/Chapter";
import Login from "~/pages/Login";
import Register from "~/pages/Register";
import Category from "~/pages/Category";
import StoryShow from "~/pages/Admin/StoryShow";
import AddChapter from "~/pages/Admin/AddChapter";
import EditChapter from "~/pages/Admin/EditChapter";
import EditStory from "~/pages/Admin/EditStory";
import HistoryPage from "~/pages/History";
import SettingsPage from "~/pages/Settings";
import DataPage from "~/pages/Admin/Data";
import SearchPage from "~/pages/Search";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.story, component: Story },
    { path: config.routes.chapter, component: Chapter },
    { path: config.routes.login, component: Login },    
    { path: config.routes.register, component: Register },
    { path: config.routes.category, component: Category },
    { path: config.routes.categoryAll, component: Category },
    { path: config.routes.adminStories, component: StoryShow },
    { path: config.routes.adminAddChapter, component: AddChapter },
    { path: config.routes.adminEditStory, component: EditStory },
    { path: config.routes.adminEditChapter, component: EditChapter },
    { path: config.routes.history, component: HistoryPage },
    { path: config.routes.settings, component: SettingsPage },
    { path: config.routes.adminData, component: DataPage },
    { path: config.routes.search, component: SearchPage },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }