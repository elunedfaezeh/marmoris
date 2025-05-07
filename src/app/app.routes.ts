import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadChildren: () => import('./layout/layout.routes').then(mod => mod.routes) },
  { path: 'admin', loadChildren: () => import('./panel/admin/admin.routes').then(mod => mod.routes) },
];
