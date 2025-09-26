import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PyramideComponent } from "./pyramide/pyramide.component";
import { MemberComponent } from './member/member.component';
import { CreateMatchComponent } from './create-match/create-match.component';

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
        path: 'pyramide',
        component: PyramideComponent
    },
    {
        path: 'member',
        component: MemberComponent
    },
    {
        path: 'create-match',
        component: CreateMatchComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
