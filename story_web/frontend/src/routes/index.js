import config from "~/config";
import Home from "~/pages/Home";
import Story from "~/pages/Story";
import Chapter from "~/pages/Chapter";
import Login from "~/pages/Login";
import Register from "~/pages/Register";
import Category from "~/pages/Category";

const publicRoutes = [
    { path: config.routes.home, component: Home },
    { path: config.routes.story, component: Story },
    { path: config.routes.chapter, component: Chapter },
    { path: config.routes.login, component: Login },    
    { path: config.routes.register, component: Register },
    { path: config.routes.category, component: Category },
]

const privateRoutes = [

]

export { publicRoutes, privateRoutes }