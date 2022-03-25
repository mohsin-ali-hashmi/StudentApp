import login from '../views/auth/StudentLogin';
import signup from '../views/auth/StudentSignup';
import home from '../views/main/home';
import result from '../views/main/StudentResult';
import test from '../views/main/StudentTest';




let routes = [
	{
		path: '/',
		component: login,
		layout: 'auth',
	},

	{
		path: '/studentsignup',
		component: signup,
		layout: 'auth',
	},

	{
		path: '/student',
		component: home ,
		layout: 'main',
		
	},

	{
		path: '/student/result',
		component: result ,
		layout: 'main',
		
	},
	{
		path: '/student/test',
		component: test ,
		layout: 'main',
		
	},
	
	
];
export default routes;