import { ComponentFixture, TestBed } from '@angular/core/testing';
import { TranslatorPage } from './translator.page';

describe('TranslatorPage', () => {
  let component: TranslatorPage;
  let fixture: ComponentFixture<TranslatorPage>;

  beforeEach(() => {
    fixture = TestBed.createComponent(TranslatorPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
