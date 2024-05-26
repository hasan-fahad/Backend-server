import express from 'express';
import { UserRoutes } from '../user/user.route';
import { StudentRoutes } from '../student/student.route';


const router = express.Router();

const moduleRoutes = [
    {
        path:'/users',
        router: UserRoutes,
    },
    {
        path:'/students',
        router: StudentRoutes,
    },
    

]


moduleRoutes.forEach((route) => {
    router.use(route.path, route.router);
});

export default router;
