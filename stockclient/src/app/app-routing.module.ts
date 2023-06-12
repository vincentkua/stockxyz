import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './components/stock/stock.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { AllComponent } from './components/all/all.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AddComponent } from './components/add/add.component';
import { EditComponent } from './components/edit/edit.component';
import { SignupComponent } from './components/signup/signup.component';

const routes: Routes = [
  {path:"" , component:LoginComponent},
  {path:"all" , component:AllComponent},
  {path:"add" , component:AddComponent},
  {path:"edit/:ticker" , component:EditComponent},
  {path:"watchlist" , component:WatchlistComponent},
  {path:"portfolio" , component:PortfolioComponent},
  {path:"stock/:ticker" , component:StockComponent},
  {path:"login" , component:LoginComponent},
  {path:"signup" , component:SignupComponent},
  {path:"about" , component:AboutComponent},
  {path:"**" , redirectTo:"/", pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
