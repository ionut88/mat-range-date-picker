import { Injectable } from '@angular/core';
import { Options } from '../model/model';

@Injectable()
export class ConfigStoreService {
  private _rdpOptions: Options;
  private defaultOptions = {
    startDatePrefix: 'FROM:',
    endDatePrefix: 'TO:',
    applyLabel: 'Apply',
    cancelLabel: 'Cancel',
    excludeWeekends: false,
    animation: true,
    locale: 'en-US',
    fromMinMax: { fromDate: null, toDate: null },
    toMinMax: { fromDate: null, toDate: null }
  };

  constructor() {}

  get options(): Options {
    return this._rdpOptions;
  }

  set options(options: Options) {
    this._rdpOptions = { ...this.defaultOptions, ...options };
  }
}
