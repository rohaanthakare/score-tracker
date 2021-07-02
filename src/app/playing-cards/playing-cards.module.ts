import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { GameListComponent } from './game-list/game-list.component';
import { UnoComponent } from './uno/uno.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { UnoModalComponent } from './uno-modal/uno-modal.component';

const routes: Routes = [{
  path: '',
  component: GameListComponent
}, {
  path: ':code',
  component: UnoComponent
}];

@NgModule({
  declarations: [GameListComponent, UnoComponent, UnoModalComponent],
  imports: [
    CommonModule, RouterModule.forChild(routes), FormsModule, ReactiveFormsModule, IonicModule
  ]
})
export class PlayingCardsModule { }


export enum CardGames {
  UNO = 'uno',
  HIGH_SCORE_WINNER = 'high_score_winner',
  LOW_SCORE_WINNER = 'low_score_winner'
}