import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children: [{
      path: '',
      loadChildren: () => import('../dashboard/dashboard.module').then( m => m.DashboardModule)
    }, {
      path: 'cards',
      loadChildren: () => import('../playing-cards/playing-cards.module').then( m => m.PlayingCardsModule)
    }, {
      path: 'sports',
      loadChildren: () => import('../sports/sports.module').then( m => m.SportsModule)
    }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
