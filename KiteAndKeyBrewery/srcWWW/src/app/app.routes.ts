import { Routes } from '@angular/router';

export const routes: Routes = [
    {
        path: '', loadComponent: () => import('./features/pages/beer-recipe-dashboard/beer-recipe-dashboard.component').then(mod => mod.BeerRecipeDashboard)
    }
];
