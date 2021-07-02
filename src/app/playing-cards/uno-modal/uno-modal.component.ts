import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { CardGames } from '../playing-cards.module';

@Component({
  selector: 'app-uno-modal',
  templateUrl: './uno-modal.component.html',
  styleUrls: ['./uno-modal.component.scss'],
})
export class UnoModalComponent implements OnInit {
  @Input() playerDetails: any;
  @Input() roundNumber: number;
  @Input() gameCode: CardGames;
  roundResult: any;
  isUno = false;
  roundForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController) { }

  ngOnInit() {
    this.isUno = this.gameCode === CardGames.UNO ? true : false;
    if (this.isUno) {
      this.roundForm = this.formBuilder.group({
      });
      this.roundForm.addControl('winnerDetail', new FormControl());
      this.roundForm.addControl('winnerScore', new FormControl());
    } else {
      this.roundForm = this.formBuilder.group({
      });

      this.playerDetails.forEach((p) => {
        this.roundForm.addControl('playerScore' + p.id, new FormControl());
        p['scoreCtrlName'] = 'playerScore' + p.id;
      });
    }
  }

  dismissModal() {
    this.modalCtrl.dismiss(this.roundResult);
  }

  finishRound() {
    if (this.isUno) {
      this.roundResult = this.roundForm.value;
    } else {
      this.roundResult = [];
      this.playerDetails.forEach((p) => {
         this.roundResult.push({
          id: p.id,
          playerScore: this.roundForm.value['playerScore' + p.id]
        });
      });
    }
    this.dismissModal();
  }
}
