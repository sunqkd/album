import Vue from 'vue'
import Router from 'vue-router'
import Project from '@/components/project';
import Intelligence from "@/components/intelligence";
import Organization from '@/components/organization';
import News from '@/components/news';
import Activity from '@/components/activity';
import Report from '@/components/report';
import ALbum from '@/components/ALbum';



import Project1 from '@/components/project1';
import Intelligence1 from "@/components/intelligence1";
import Organization1 from '@/components/organization1';
import News1 from '@/components/news1';
import Activity1 from '@/components/activity1';
import Report1 from '@/components/report1';
import ALbum1 from '@/components/ALbum1';
import globalSearch from '@/components/globalSearch'

Vue.use(Router)

export default new Router({
	// mode:'history',
	linkActiveClass:'RouterActive',
	routes: [
		{
			path: '',
			component: ALbum,
			children: [
				{
					path:'',
					redirect:'/project'
				},
				{
					path: '/project',
					component: Project
				},
				{
					path: '/intelligence',
					component: Intelligence
				},
				{
					path: '/organization',
					component: Organization
				},
				{
					path: '/news',
					component: News
				},
				{
					path: '/activity',
					component: Activity
				},
				{
					path: '/report',
					component: Report
				}
			]
		},
		{
			path:'/globalSearch',
			component:globalSearch
		},
		// {
		// 	path: '*',
		// 	redirect: '/'
		// },
		{
			path: '/collect',
			component: ALbum1,
			children: [
				{
					path:'/collect',
					redirect:'/collect/project1'
				},
				{
					path: '/collect/project1',
					component: Project1
				},
				{
					path: '/collect/intelligence1',
					component: Intelligence1
				},
				{
					path: '/collect/organization1',
					component: Organization1
				},
				{
					path: '/collect/news1',
					component: News1
				},
				{
					path: '/collect/activity1',
					component: Activity1
				},
				{
					path: '/collect/report1',
					component: Report1
				}
			]
		}
	]
})
