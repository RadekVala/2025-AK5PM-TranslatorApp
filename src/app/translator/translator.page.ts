import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonCard, IonCardContent, IonInput, IonButton } from '@ionic/angular/standalone';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { TranslatorService } from '../services/api/translator.service';
import { StoreService } from '../services/store.service';

@Component({
  selector: 'app-translator',
  templateUrl: './translator.page.html',
  styleUrls: ['./translator.page.scss'],
  standalone: true,
  imports: [IonButton, ReactiveFormsModule, IonInput, IonCardContent, IonCard, IonContent, IonHeader, IonTitle, IonToolbar, CommonModule, FormsModule]
})
export class TranslatorPage implements OnInit {

  userInput = new FormControl<string>('');
  result: string | null = null;
  private translatorService = inject(TranslatorService);
  private storeService = inject(StoreService);

  //constructor(private translatorService: TranslatorService) { }

  ngOnInit() {
  }

  async translateClicked() {
    const input = this.userInput.value
    console.log('Translating:', input);
    // Translation logic would go here
    if (!input || input.trim() === '') {
      this.result = '';
      return;
    }
    this.result = await this.translatorService.translate(input);
    // store permanentrly using Preferences API
    this.storeService.store({
      uuid: crypto.randomUUID(),
      originalText: input,
      translatedText: this.result || '',
      timestamp: Date.now()
    });
  }
}
