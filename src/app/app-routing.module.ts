import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'logout',
    //loadChildren: './board/board.module#BoardModule'
    loadChildren: () => import('./logout/logout.module').then(m => m.LogoutModule)
  },
  {
    path: 'board',
    //loadChildren: './board/board.module#BoardModule'
    loadChildren: () => import('./board/board.module').then(m => m.BoardModule)
  },
  {
    path: 'home',
    //loadChildren: './home/home.module#HomeModule',
    loadChildren: () => import('./home/home.module').then(m => m.HomeModule)
  },
 
  {
    path: 'signin',
    //loadChildren: './home/home.module#HomeModule',
    loadChildren: () => import('./signin/signin.module').then(m => m.SigninModule)
  },
  {
    path: 'signup',
    //loadChildren: './home/home.module#HomeModule',
    loadChildren: () => import('./signup/signup.module').then(m => m.SignupModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
