import { Injectable } from '@angular/core';
import { Preferences } from '@capacitor/preferences';

export interface TranslationRecord {
  uuid: string;
  originalText: string;
  translatedText: string;
  timestamp: number;
}

@Injectable({
  providedIn: 'root',
})
export class StoreService {

  history: TranslationRecord[] = [];

  async store(translationRecord: TranslationRecord): Promise<void> {
    this.history.unshift(translationRecord);
    Preferences.set({
      key: 'history',
      value: JSON.stringify(this.history),
    });
  }

  async loadHistory(): Promise<void> {
    const { value } = await Preferences.get({ key: 'history' });
    if (value) {
      this.history = JSON.parse(value);
    }
  }
}
