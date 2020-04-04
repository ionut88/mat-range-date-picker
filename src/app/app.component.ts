import { Component, OnInit, ViewChild } from '@angular/core';
import { Options, Range } from './mat-pick-range/model/model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  public range1: Range = { fromDate: new Date(), toDate: new Date() };
  public range2: Range = { fromDate: new Date(), toDate: new Date() };
  options: Options;
  @ViewChild('picker1', { static: false }) picker1;
  @ViewChild('picker2', { static: false }) picker2;

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
      range: { fromDate: backDate(1), toDate: today }
    };
  }

  updateRange1(range: Range) {
    this.range1 = range;
  }

  updateRange2(range: Range) {
    this.range2 = range;
  }

  reset() {
    const today = new Date();
    this.picker1.resetDates({ fromDate: today, toDate: today });
    this.picker2.resetDates({ fromDate: new Date(today.getFullYear(), today.getMonth(), today.getDate() - 1), toDate: today });
  }
}
