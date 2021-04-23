import { createRouter, createWebHashHistory } from 'vue-router';
import aliases from '@snapshot-labs/snapshot-spaces/spaces/aliases.json';
import Proposals from '@/views/Proposals.vue';
import Proposal from '@/views/Proposal.vue';
import Create from '@/views/Create.vue';
import Settings from '@/views/Settings.vue';


const beforeEnter = (to: any, from, next) => {
  if (aliases?.[to?.params?.key]) {
    to.params.key = aliases[to.params.key];
    return next(to);
  }
  next();
};

const routes: any[] = [
  { path: '/settings/:from?', name: 'settings', component: Settings },
  {
    path: '/proposal/:id',
    name: 'proposal',
    component: Proposal,
    beforeEnter
  },
  {
    path: '/create/:from?',
    name: 'create',
    component: Create,
    beforeEnter
  },
  {
    path: '/',
    name: 'proposals',
    component: Proposals,
    beforeEnter
  },
  {
    path: '/:tab',
    name: 'proposals-tab',
    component: Proposals,
    beforeEnter
  },
  { path: '/*', name: 'error-404', beforeEnter: (to, from, next) => next('/') }
];

const router = createRouter({
  history: createWebHashHistory(),
  routes,
  scrollBehavior(): {} {
    return { top: 0 };
  }
});

export default router;
