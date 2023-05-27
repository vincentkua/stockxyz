import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { StockComponent } from './components/stock/stock.component';
import { LoginComponent } from './components/login/login.component';
import { AboutComponent } from './components/about/about.component';
import { AllComponent } from './components/all/all.component';
import { WatchlistComponent } from './components/watchlist/watchlist.component';
import { PortfolioComponent } from './components/portfolio/portfolio.component';
import { AddComponent } from './components/add/add.component';

const routes: Routes = [
  {path:"" , component:AllComponent},
  {path:"all" , component:AllComponent},
  {path:"add" , component:AddComponent},
  {path:"watchlist" , component:WatchlistComponent},
  {path:"portfolio" , component:PortfolioComponent},
  {path:"stock" , component:StockComponent},
  {path:"login" , component:LoginComponent},
  {path:"about" , component:AboutComponent},
  {path:"**" , redirectTo:"/", pathMatch:'full'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
