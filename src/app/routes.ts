import { Routes } from '@angular/router'
import { HomeComponent } from './home/home.component';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import { SignInComponent } from './user/sign-in/sign-in.component';
import { HistoryComponent } from './history/history.component';
import { CreateComponent } from './create-well/create.component';

export const appRoutes: Routes = [
    { path: 'home', component: HomeComponent},
    { path: 'createwell', component: CreateComponent},
    { path: 'history', component: HistoryComponent},
    {
        path: 'signup', component: UserComponent,
        children: [{ path: '', component: SignUpComponent }]
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    { path : '', redirectTo:'/login', pathMatch : 'full'}    
];