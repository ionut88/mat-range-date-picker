import { OverlayRef } from '@angular/cdk/overlay';
import { DatePipe } from '@angular/common';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, EventEmitter, Input, OnDestroy, OnInit, Output, ViewChild, ElementRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { Range, RdpOptions } from '../model/model';
import { CalendarOverlayService } from '../services/calendar-overlay.service';
import { ConfigStoreService } from '../services/config-store.service';
import { RangeStoreService } from '../services/range-store.service';

@Component({
  selector: 'mat-rdp',
  templateUrl: './mat-rdp.component.html',
  styleUrls: ['./mat-rdp.component.scss'],
  providers: [
    CalendarOverlayService,
    RangeStoreService,
    ConfigStoreService,
    DatePipe
  ],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class MatRdpComponent implements OnInit, OnDestroy {
  @ViewChild('calendarInput', { static: true }) calendarInput: ElementRef;
  @Output() readonly selectedDateRangeChanged: EventEmitter<Range> = new EventEmitter<Range>();
  @Input() options: RdpOptions;

  private rangeUpdate$: Subscription;
  public selectedDateRange = '';

  constructor(
    private changeDetectionRef: ChangeDetectorRef,
    private calendarOverlayService: CalendarOverlayService,
    public rangeStoreService: RangeStoreService,
    public configStoreService: ConfigStoreService,
    private datePipe: DatePipe
  ) { }

  ngOnInit() {
    this.configStoreService.options = this.options;
    this.options.placeholder = this.options.placeholder || 'Choose a date';
    this.rangeUpdate$ = this.rangeStoreService.rangeUpdate$.subscribe(range => {
      const from: string = this.formatToDateString(
        range.fromDate,
        this.options.format
      );
      const to: string = this.formatToDateString(
        range.toDate,
        this.options.format
      );
      this.selectedDateRange = `${from} - ${to}`;
      this.selectedDateRangeChanged.emit(range);
    });

    this.rangeStoreService.updateRange(
      this.options.range.fromDate,
      this.options.range.toDate
    );
    this.changeDetectionRef.detectChanges();
  }

  ngOnDestroy() {
    if (this.rangeUpdate$) {
      this.rangeUpdate$.unsubscribe();
    }
  }

  private formatToDateString(date: Date, format: string): string {
    return this.datePipe.transform(date, format);
  }

  openCalendar(event) {
    const overlayRef: OverlayRef = this.calendarOverlayService.open(
      this.options.calendarOverlayConfig,
      this.calendarInput
    );
  }

  public resetDates(range: Range) {
    this.rangeStoreService.updateRange(
      range.fromDate,
      range.toDate
    );
  }
}
