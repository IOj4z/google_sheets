import Vue from 'vue';
import VueRouter from 'vue-router';
import DataForm from '../components/DataForm.vue';
import TableList from '../components/TableList.vue';

Vue.use(VueRouter);

const routes = [
    {
        path: '',
        component: DataForm,
        name: 'DataForm'
    },
    {
        path: '/table-list',
        component: TableList,
        name: 'table-list'
    }
];
const router = new VueRouter({
    routes,
    mode: 'history', // Опционально, чтобы убрать # из URL
});

export default router;
