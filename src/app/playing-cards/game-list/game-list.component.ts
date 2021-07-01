import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-game-list',
  templateUrl: './game-list.component.html',
  styleUrls: ['./game-list.component.scss'],
})
export class GameListComponent implements OnInit {
  gameList = [{
    name: 'UNO',
    code:'uno',
    iconImageName: 'uno_white.png',
    pathUrl: ''
  }, {
    name: 'High Score Winner',
    code:'high_score_winner',
    iconImageName: 'cards_white.png',
    pathUrl: ''
  }, {
    name: 'Low Score Winner',
    code:'low_score_winner',
    iconImageName: 'cards_white.png',
    pathUrl: ''
  }];
  constructor(private router: Router) { }

  ngOnInit() {}

  widgetClicked(game) {
    console.log('Game Clicked');
    console.log(game);
    this.router.navigate([`home/cards/${game.code}`]);
  }

}
