import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent } from '@ionic/angular/standalone';
import { StoreService } from '../services/firebase/store.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.page.html',
  styleUrls: ['./history.page.scss'],
  standalone: true,
  imports: [IonCardContent, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class HistoryPage implements OnInit {

  storeService = inject(StoreService)

  constructor() {
    console.log('History constructor');
  }

  ngOnInit() {
    console.log('Angular component History initialized');
  }
}
