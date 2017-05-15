import Vue from 'vue';
import Resource from 'vue-resource';
import Router from 'vue-router';
import Home from '@/components/home/home';
import Product from '@/components/product/Product';
import Doc from '@/components/doc/Doc';
import Login from '@/components/manager/login';
import PlatformHome from '@/components/manager/home';
import MainPage from '@/components/manager/main/index';
import Notice from '@/components/manager/main/notice';
import ServiceQuery from '@/components/manager/monitor/service';
import Configuration from '@/components/manager/configuration/productConfig';
import Consume from '@/components/manager/finance/consume';
import Ticket from '@/components/manager/finance/ticket';
import Deposit from '@/components/manager/finance/deposit';
import {Loading} from 'element-ui';
import {MessageBox} from 'element-ui';

Vue.use(Router);
Vue.use(Resource);
const router = new Router({
  mode: 'history',
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
        {path: '/notice', component: Notice},
        {path: '/monitor/:product', component: ServiceQuery},
        {path: '/configuration/:product', component: Configuration},
        {path: '/consume', component: Consume},
        {path: '/ticket', component: Ticket},
        {path: '/deposit', component: Deposit}
      ]
    }
  ]
});
Vue.http.interceptors.push((request, next) => {
  // 加载进度显示、添加token到headers、全局报错
  let loadingInstance = null;
  let url = request.url;
  let token = window.sessionStorage.getItem('token');
  let api = window.sessionStorage.getItem('api');
  let loginIndex = String(url).lastIndexOf('/login');
  let waimaiIndex = String(url).lastIndexOf('/waimai/');
  let schoolIndex = String(url).lastIndexOf('/school-geo/');
  if (loginIndex === 32) {
    loadingInstance = Loading.service({fullscreen: true, text: '拼命加载中', customClass: 'loading'});
  }
  if (waimaiIndex > 0 || schoolIndex > 0) {
    let authorization = '';
    let orderIndex = String(url).lastIndexOf('/orders');
    let auth = String(api).split('_api_');
    if (orderIndex >= 0) {
      authorization = 'Token ' + auth[1];
    } else {
      authorization = 'ApiKey ' + auth[0];
    }
    request.headers.set('Authorization', authorization);
    // Vue.http.headers.common['Authorization'] = authorization;
  } else {
    if (typeof token === 'string') {
      // Vue.http.headers.common['Authorization'] = 'Token ' + token;
      request.headers.set('Authorization', 'Token ' + token);
    }
  }
  next((response) => {
    let status = String(response.status);
    if (status.indexOf('4') === 0) {
      MessageBox({title: '错误', message: '请求错误'});
    } else if (status.indexOf('5') === 0) {
      MessageBox({title: '错误', message: '服务器错误'});
    }
    if (loadingInstance) {
      loadingInstance.close();
    }
    return response;
  });
});
export default router;
