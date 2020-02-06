import VueRouter from 'vue-router'
const routers = new VueRouter({
    routes: [{
        path:'/uploadPage',
        name:'uploadPage',
        component:() => import('../pages/UploadPage')
    },{
        path:'/upload',
        redirect:'/uploadPage'
    },{
        path:'/tree',
        name:'tree',
        component:() => import('../pages/MyTree')
    },{
        path:'/table',
        name:'table',
        component:() => import('../pages/MyTable')
    }]
})
export default routers;