const routes = [
  {
    path: '/',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/Index.vue') },
      { path: '/profile', component: () => import('pages/Profile.vue') },
     
    ],
    
  },
  {
    path: '/Signin',
 
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Signin.vue') }
    ],
   
  },
  {
    path: '/Signup',
    
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Signup.vue') }
    ]
  },
  {
    path: '/Profile',
   
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Profile.vue') }
    ]
  },
  {
    path: '/Chat',
    
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Chat.vue') }
    ]
  },
  
  {
    path: '/Modulo/:idcurso',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Modulo.vue') }
    ]
  },
  {
    path: '/Lessons/:idmodulo',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Lessons.vue') }
    ]
  },
  {
    path: '/SeeLesson/:idcurso',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('pages/SeeLesson.vue') },
     
     
    ],
    
  },
  {
    path: '/Activities/:clasid',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Activities.vue') }
    ]
  },
  {
    path: '/Dashboard',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Dashboard.vue') }
    ]
  },
  {
    path: '/Datospersonales',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Datospersonales.vue') }
    ]
  },
  {
    path: '/Codigo',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Codigo.vue') }
    ]
  },
  {
    path: '/Evaluation/:idcurso',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Evaluation.vue') }
    ]
  },
   {
    path: '/ExamenModulo/:idmodulo',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/ExamenModulo.vue') }
    ]
  },
  {
    path: '/Administracion',
    component: () => import('layouts/MainLayout.vue'),
    children: [
      { path: '', component: () => import('src/pages/Administracion.vue') }
    ]
  }
  
]

// Always leave this as last one
if (process.env.MODE !== 'ssr') {
  routes.push({
    path: '*',
    component: () => import('pages/Error404.vue')
  })
};



export default routes
