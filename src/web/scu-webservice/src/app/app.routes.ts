import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PyramideComponent } from "./pyramide/pyramide.component";
import { MemberComponent } from './member/member.component';
import { CreateMatchComponent } from './create-match/create-match.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberSingleComponent } from './member-single/member-single.component';

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
        path: 'create-member',
        component: MemberCreateComponent
    },
    {
        path: 'member/:id',
        component: MemberSingleComponent
    },
    {
        path: 'member/:id/edit',
        component: MemberEditComponent
    },
    {
        path: '**',
        redirectTo: 'home'
    }
];
