import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-uno-modal',
  templateUrl: './uno-modal.component.html',
  styleUrls: ['./uno-modal.component.scss'],
})
export class UnoModalComponent implements OnInit {
  @Input() playerDetails: any;
  @Input() roundNumber: number;
  roundResult: any;
  roundForm: FormGroup = this.formBuilder.group({
    winnerDetail: new FormControl(),
    winnerScore: new FormControl()
  });
  constructor(private formBuilder: FormBuilder, private modalCtrl: ModalController) { }

  ngOnInit() {}

  dismissModal() {
    this.modalCtrl.dismiss(this.roundResult);
  }

  finishRound() {
    this.roundResult = this.roundForm.value;
    this.dismissModal();
  }
}
