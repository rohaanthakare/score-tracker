import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController, ModalController } from '@ionic/angular';
import { HelperService, SortDirection } from 'src/app/helper.service';
import { UnoModalComponent } from '../uno-modal/uno-modal.component';

export class PlayerDetail {
  id: number;
  name: string;
  score: string;
}

@Component({
  selector: 'app-uno',
  templateUrl: './uno.component.html',
  styleUrls: ['./uno.component.scss'],
})
export class UnoComponent implements OnInit {
  isNumberOfPlayersAdded = false;
  isShowScoreboard = false;
  roundNumber = 1;
  gameCompleted = false;
  numberOfPlayersCtrl = new FormControl('', []);
  gameForm: FormGroup = this.formBuilder.group({
    numberOfPlayers: this.numberOfPlayersCtrl
  });
  winnerName = ''; 
  playerDetails = [];
  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController, private alertCtrl: AlertController,
    private helperService: HelperService, private router: Router) { }

  ngOnInit() {}

  addPlayerDetails() {
    this.isNumberOfPlayersAdded = true;
    for(let index = 0; index < this.gameForm.value.numberOfPlayers; index++) {
      const playerObj = {
        id: index,
        name: '',
        score: 0,
      };
      this.gameForm.addControl('playerName' + index, new FormControl())
      // playerObj[] = new FormControl();
      playerObj['nameCtrl'] = 'playerName' + index;
      this.playerDetails.push(playerObj);
    }
  }

  startGame() {
    this.playerDetails.forEach((p) => {
      p.name = this.helperService.convertToTitleCase(this.gameForm.value['playerName' + p.id]);
    });

    this.isShowScoreboard = true;
  }

  showScoreboard() {
    this.playerDetails.forEach((p) => {
      p.name = this.gameForm.value['playerName' + p.id];
    });
  }

  async finishRound() {
    const roundModal = await this.modalCtrl.create({
      component: UnoModalComponent,
      componentProps: {
        playerDetails: this.playerDetails,
        roundNumber: this.roundNumber
      }
    });

    roundModal.onDidDismiss().then((data: any) => {
      this.playerDetails.forEach((p) => {
        if (p.id === data.data.winnerDetail.id) {
          p.score = p.score + data.data.winnerScore;
          if (p.score >= 500) {
            this.gameCompleted = true;
            this.winnerName = p.name;
            this.isGameCompleted();
          }          
        }
      });

      this.helperService.sortArray(this.playerDetails, 'score', SortDirection.DESC);
      this.roundNumber++;
    });

    await roundModal.present();
  }

  async isGameCompleted() {
    if (this.gameCompleted) {
      const alertModal = await this.alertCtrl.create({
        header: 'WINNER !!!!',
        subHeader: this.winnerName,
        message: 'Won this game of UNO.',
        buttons: ['OK']
      });

      await alertModal.present();
    }
  }

  endGame() {
    this.router.navigate(['/home']);
  }
}
