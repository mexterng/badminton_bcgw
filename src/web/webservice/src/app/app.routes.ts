import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PyramideComponent } from "./pyramide/pyramide.component";
import { MemberComponent } from './member/member.component';
import { MatchComponent } from './match/match.component';
import { CreateMatchComponent } from './create-match/create-match.component';
import { MemberCreateComponent } from './member-create/member-create.component';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { MemberSingleComponent } from './member-single/member-single.component';
import { ChangelogComponent } from './changelog/changelog.component';
import { AuthGuard } from './guards/auth.guard';
import { RoleGuard } from './guards/role.guard';

//https://angular.dev/guide/routing/define-routes
//!! first wins strategy, so order matters
export const routes: Routes = [
    {
        path: 'login',
        loadComponent: () => import('./login/login.components').then(m => m.LoginComponent)
    },
    {   
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'changelog',
        component: ChangelogComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'home',
        component: HomeComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'pyramide',
        component: PyramideComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'member',
        component: MemberComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'match',
        component: MatchComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'match/create',
        component: CreateMatchComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'create-member',
        component: MemberCreateComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'member/:id',
        component: MemberSingleComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'member/:id/edit',
        component: MemberEditComponent,
        canActivate: [AuthGuard, RoleGuard],
        data: { requiredRole: 'admin' }
    },
    {
        path: '**',
        redirectTo: 'login'
    }
];
