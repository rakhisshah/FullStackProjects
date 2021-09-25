import { createComponent } from '@angular/compiler/src/core';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateComponent } from './create/create.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ReadComponent } from './read/read.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [
  {path:'create',component:CreateComponent},
  {path:'create/:bookid',component:CreateComponent},
  //{path:'/home',component:HomeComponent},
  {path:'read',component:ReadComponent},
  {path:'home',component:HomeComponent},
  {path:'login',component:LoginComponent},
  {path:'login',component:SignupComponent}
  

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
