import { Routes } from '@angular/router';
import { AUTH_ROUTES } from './modules/auth/routes/auth.routes';
import { App } from './app';
import { HOME_ROUTES } from './modules/home/routes/home.routes';

const isLoggedIn = false;

export const routes: Routes = [
  ...AUTH_ROUTES,
  ...HOME_ROUTES,
  {
    path: '',
    redirectTo: isLoggedIn ? 'home' : 'login',
    pathMatch: 'full',
  },
  {
    path: '**',
    redirectTo: '',
  },
];
