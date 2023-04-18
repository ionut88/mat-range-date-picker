import { Injectable } from '@angular/core';
import { Options } from '../model/model';

@Injectable()
export class ConfigStoreService {
  private _rdpOptions: Options;
  private defaultOptions: Options = {
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    placeholder: 'Choose a date',
    format: 'mediumDate',
    excludeWeekends: false,
    locale: 'en-US',
    fromMinMax: { fromDate: null, toDate: null },
    toMinMax: { fromDate: null, toDate: null },
    range: { fromDate: new Date(), toDate: new Date() },
    calendarOverlayConfig: {
      panelClass: 'mat-prd-overlay',
      hasBackdrop: true,
      backdropClass: 'mat-prd-overlay-backdrop',
      shouldCloseOnBackdropClick: true,
    },
  };

  constructor() {
    this._rdpOptions = this.defaultOptions;
  }

  get options(): Options {
    return this._rdpOptions;
  }

  set options(options: Options) {
    this._rdpOptions = { ...this.defaultOptions, ...options };
  }
}
