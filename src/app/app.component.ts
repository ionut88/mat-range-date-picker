import { Component, OnInit, ViewChild } from '@angular/core';
import { Options, Range } from './mat-pick-range/model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  range: Range = { fromDate: new Date(), toDate: new Date() };
  options: Options;
  @ViewChild('picker', { static: false }) picker;

  ngOnInit() {
    const backDate = numOfDays => {
      const today = new Date();
      return new Date(today.setDate(today.getDate() - numOfDays));
    };
    const today = new Date();
    this.options = {
      presets: [{
        presetLabel: 'Last 7 Days',
        range: { fromDate: backDate(7), toDate: today }
      },
      {
        presetLabel: 'Last 30 Days',
        range: { fromDate: backDate(30), toDate: today }
      }],
      format: 'mediumDate',
      range: { fromDate: backDate(1), toDate: today }
    };
  }

  updateRange(range: Range) {
    this.range = range;
  }

  reset() {
    const today = new Date();
    this.picker.resetDates({ fromDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), toDate: today });
  }
}
