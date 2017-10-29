
import { RouterModule, Routes } from '@angular/router';


const routes: Routes = [
  { path: '', loadChildren: './landing/landing.module#LandingModule' },
  { path: 'home', loadChildren: './home/home.module#HomeModule' }
];

export const AppRouting = RouterModule.forRoot(routes, { useHash: false });
