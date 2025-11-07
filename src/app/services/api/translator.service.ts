import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class TranslatorService {

  async translate(text: string): Promise<string> {
    const url = `https://api.mymemory.translated.net/get?q=${text}&langpair=cs|en`;
    const response = await fetch(url)
    const data: TranslationResponse = await response.json();
    return data.responseData.translatedText;
  }
}

export interface TranslationResponse {
  responseData: ResponseData
  quotaFinished: boolean
  mtLangSupported: any
  responseDetails: string
  responseStatus: number
  responderId: any
  exception_code: any
  matches: Match[]
}

export interface ResponseData {
  translatedText: string
  match: number
}

export interface Match {
  id: string
  segment: string
  translation: string
  source: string
  target: string
  quality: number
  reference: any
  "usage-count": number
  subject: string
  "created-by": string
  "last-updated-by": string
  "create-date": string
  "last-update-date": string
  match: number
  penalty: number
}

