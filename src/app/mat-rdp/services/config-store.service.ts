import { Injectable } from '@angular/core';
import { RdpOptions } from '../model/model';

@Injectable()
export class ConfigStoreService {
  private _rdpOptions: RdpOptions;
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

  get options(): RdpOptions {
    return this._rdpOptions;
  }

  set options(options: RdpOptions) {
    this._rdpOptions = { ...this.defaultOptions, ...options };
  }
}
