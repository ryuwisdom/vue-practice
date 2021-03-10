import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from './views/Home';
import About from './views/About';

Vue.use(VueRouter);

const router = new VueRouter({
  // url에 #이 나오지 않도록
  mode: 'history',
  routes: [
    // 초기 url
    { path: '/', redirect: 'home' },
    {
      path: '/home',
      component: Home,
    },
    {
      path: '/home/:name',
      component: About,
      // 함수로 지정하면 첫 매개변수로 현재 라우트 객체를 사용할 수 있음.
      // props: (route) => ({ id: Number(route.params.id) }),
      props: (route) => ({ name: String(route.params.name) }),
    },
  ],
});

export default router;
