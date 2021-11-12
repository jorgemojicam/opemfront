import Vue from 'vue';
import Router from 'vue-router';

// -- Main 
import Layout from '@/components/Layout/Layout';
import Dashboard from '@/pages/Dashboard/Dashboard';
import Login from '@/pages/Login/Login';
import ErrorPage from '@/pages/Error/Error';

//-- LOGIC ( All the bussiness logic components )
import Cursos from '@/components/LOGIC/cursos/Cursos';
import CursosNew from '@/components/LOGIC/cursos/CursosNew';

// -- Template Resources
import TypographyPage from '@/pages/Typography/Typography';
import TablesBasicPage from '@/pages/Tables/Basic';
import GoogleMapPage from '@/pages/Maps/Google';
import ChartsPage from '@/pages/Charts/Charts';
import IconsPage from '@/pages/Icons/Icons';
import NotificationsPage from '@/pages/Notifications/Notifications';

// Mixins

import { isAuthenticated } from './mixins/auth'


Vue.use(Router);

export default new Router({
  routes: [
    { path: '/', redirect: { name: 'Dashboard' } },
    {
      path: '/login',
      name: 'Login',
      component: Login,
    },
    {
      path: '/error',
      name: 'Error',
      component: ErrorPage,
    },
    {
      path: '/app',
      name: 'Layout',
      component: Layout,
      redirect: { name: 'Dashboard' },
      beforeEnter: ((to, from, next) => {
        isAuthenticated() ? next() : next({ path: '/login'  })
      }),
      children: [
        {
          path: 'dashboard',
          name: 'Dashboard',
          component: Dashboard,
        },
        {
          path: 'cursos',
          name: 'Cursos',
          component: Cursos,
        },
        {
          path: 'cursos/new',
          component: CursosNew,
        },
        // ---------------------------------- //
        {
          path: 'typography',
          name: 'TypographyPage',
          component: TypographyPage,
        },
        {
          path: 'components/icons',
          name: 'IconsPage',
          component: IconsPage,
        },
        {
          path: 'notifications',
          name: 'NotificationsPage',
          component: NotificationsPage,
        },
        {
          path: 'components/charts',
          name: 'ChartsPage',
          component: ChartsPage,
        },
        {
          path: 'tables',
          name: 'TablesBasicPage',
          component: TablesBasicPage,
        },
        {
          path: 'components/maps',
          name: 'GoogleMapPage',
          component: GoogleMapPage,
        },
      ],
    },
  ],
});
