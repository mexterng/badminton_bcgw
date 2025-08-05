import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { InternalRankingManagerComponent } from './internal-ranking-manager/internal-ranking-manager.component';

//https://angular.dev/guide/routing/define-routes
//!! first wins strategy, so order matters
export const routes: Routes = [
    {   
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        component: HomeComponent
    },
    {
        path: 'ranking-manager',
        component: InternalRankingManagerComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
