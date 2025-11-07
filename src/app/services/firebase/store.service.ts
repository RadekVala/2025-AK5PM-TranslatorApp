import { Injectable } from '@angular/core';
import { Firestore, collection, collectionData, doc, setDoc } from '@angular/fire/firestore';
import { Auth, signInAnonymously, onAuthStateChanged, User } from '@angular/fire/auth';
import { BehaviorSubject } from 'rxjs';

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
  private user: User | null = null;
  private historySubject = new BehaviorSubject<TranslationRecord[]>([]);
  history$ = this.historySubject.asObservable();

  constructor(private firestore: Firestore, private auth: Auth) {
    onAuthStateChanged(this.auth, (user) => {
      this.user = user;
      if (user) this.loadTranslations();
      else signInAnonymously(this.auth);
    });
  }

  private async loadTranslations() {
    const colRef = collection(this.firestore, `users/${this.user?.uid}/history`);
    collectionData(colRef, { idField: 'uuid' }).subscribe((data) => {
      this.historySubject.next(data as TranslationRecord[]);
    });
  }

  async store(translationRecord: TranslationRecord) {
    const docRef = doc(this.firestore, `users/${this.user?.uid}/history/${translationRecord.uuid}`);
    await setDoc(docRef, translationRecord);
  }
}
