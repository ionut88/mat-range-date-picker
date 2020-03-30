import { Component, OnInit, ViewEncapsulation, ChangeDetectionStrategy } from '@angular/core';
import { PresetItem } from '../model/model';
import { RangeStoreService } from '../services/range-store.service';
import { OverlayRef } from '@angular/cdk/overlay';
import { ConfigStoreService } from '../services/config-store.service';
import { pickerOverlayAnimations } from './picker-overlay.animations';

@Component({
  selector: 'picker-overlay',
  templateUrl: './picker-overlay.component.html',
  styleUrls: ['./picker-overlay.component.scss'],
  animations: [pickerOverlayAnimations.transformPanel],
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class PickerOverlayComponent implements OnInit {
  fromDate: Date;
  toDate: Date;
  fromMinDate: Date;
  fromMaxDate: Date;
  toMinDate: Date;
  toMaxDate: Date;
  shouldAnimate: string;

  constructor(
    private rangeStoreService: RangeStoreService,
    public configStoreService: ConfigStoreService,
    private overlayRef: OverlayRef
  ) { }

  ngOnInit() {
    this.fromDate = this.rangeStoreService.fromDate;
    if (this.fromDate) {
      this.toMinDate = this.fromDate;
    }
    this.toDate = this.rangeStoreService.toDate;
    if (this.toDate) {
      this.toMinDate = this.toDate;
    }
    this.shouldAnimate = this.configStoreService.options.animation
      ? 'enter'
      : 'noop';
    ({
      fromDate: this.fromMinDate,
      toDate: this.fromMaxDate
    } = this.configStoreService.options.fromMinMax);
    ({
      fromDate: this.toMinDate,
      toDate: this.toMaxDate
    } = this.configStoreService.options.toMinMax);
  }

  updateFromDate(date: Date) {
    this.fromDate = date;
    this.toMinDate = date;
  }

  updateToDate(date: Date) {
    this.toDate = date;
    this.fromMaxDate = date;
  }

  updateRangeByPreset(presetItem: PresetItem) {
    this.updateFromDate(presetItem.range.fromDate);
    this.updateToDate(presetItem.range.toDate);
  }

  applyNewDates(e) {
    this.rangeStoreService.updateRange(this.fromDate, this.toDate);
    this.disposeOverLay();
  }

  discardNewDates(e) {
    this.disposeOverLay();
  }

  private disposeOverLay() {
    this.overlayRef.dispose();
  }
}
