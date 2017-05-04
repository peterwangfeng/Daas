import Vue from 'vue';
import Router from 'vue-router';
import Home from '@/components/home/home';
import Product from '@/components/product/Product';
import Doc from '@/components/doc/Doc';
import Login from '@/components/manager/login';
import PlatformHome from '@/components/manager/home';
import MainPage from '@/components/manager/main/index';
import Search from '@/components/manager/main/elm';
import Consume from '@/components/manager/main/consume';
import Ticket from '@/components/manager/main/ticket';
Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/product',
      name: 'Product',
      component: Product
    },
    {
      path: '/doc',
      name: 'Doc',
      component: Doc
    },
    {
      path: '/platform',
      name: 'Login',
      component: Login
    },
    {
      path: '/home',
      name: 'PlatformHome',
      component: PlatformHome,
      children: [
        {path: '/index', component: MainPage},
        {path: '/elm/:account', component: Search},
        {path: '/baidu/:account', component: Search},
        {path: '/meituan/:account', component: Search},
        {path: '/schoolgeo/:account', component: Search},
        {path: '/consume', component: Consume},
        {path: '/ticket', component: Ticket}
      ]
    }
  ]
});

export default router;
