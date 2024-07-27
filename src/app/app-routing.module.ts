import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SignInComponent } from './sign-in/sign-in.component';
import { HomePageComponent } from './home-page/home-page.component';
import { JwtGuard } from './jwt/jwt.guard';

const routes: Routes = [
  {path: 'signup', component: SignUpComponent},
  {path: 'signin', component: SignInComponent},
  {path: 'homePage', component: HomePageComponent, canActivate:[JwtGuard]},
  {path: '' , redirectTo:'/signin', pathMatch: 'full'},
  {path: '**', redirectTo:'/signin'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
