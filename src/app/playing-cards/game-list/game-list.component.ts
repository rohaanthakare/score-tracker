import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardGames } from '../playing-cards.module';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  gameList = [{
    name: 'UNO',
    code: CardGames.UNO,
    iconImageName: 'uno_white.png',
    pathUrl: ''
  }, {
    name: 'High Score Winner',
    code:CardGames.HIGH_SCORE_WINNER,
    iconImageName: 'cards_white.png',
    pathUrl: ''
  }, {
    name: 'Low Score Winner',
    code:CardGames.LOW_SCORE_WINNER,
    iconImageName: 'cards_white.png',
    pathUrl: ''
  }];
  constructor(private router: Router) { }

  ngOnInit() {}

  widgetClicked(game) {
    this.router.navigate([`home/cards/${game.code}`]);
  }

}
