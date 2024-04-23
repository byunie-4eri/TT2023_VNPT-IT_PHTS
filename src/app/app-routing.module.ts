import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ViewmapComponent } from './viewmap/viewmap.component';
import { CsudformComponent } from './csudform/csudform.component';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';
import { VphcformComponent } from './vphcform/vphcform.component';
import { ThnformComponent } from './thnform/thnform.component';

const routes: Routes = [
  { path:'', redirectTo:'login', pathMatch:'full' },
  { path: 'login', component: LoginComponent },
  { path: 'signup', component: SignupComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'viewmap', component: ViewmapComponent},
  { path: 'csudform', component: CsudformComponent},
  { path: 'vphcform', component: VphcformComponent},
  { path: 'thnform', component: ThnformComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
