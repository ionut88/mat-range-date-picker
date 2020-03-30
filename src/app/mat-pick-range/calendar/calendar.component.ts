import {
  Component,
  ViewChild,
  Output,
  Input,
  EventEmitter,
  ChangeDetectionStrategy,
  OnChanges,
  SimpleChanges
} from '@angular/core';
import { MatCalendar } from '@angular/material/datepicker';
import { ConfigStoreService } from '../services/config-store.service';

@Component({
  selector: 'calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class CalendarComponent implements OnChanges {
  @ViewChild(MatCalendar, { static: true }) matCalendar: MatCalendar<Date>;

  @Output()
  readonly selectedDateChange: EventEmitter<Date> = new EventEmitter<Date>();

  dateFormat: string;
  @Input() selectedDate: Date;
  @Input() prefixLabel: string;
  @Input() minDate: Date;
  @Input() maxDate: Date;
  weekendFilter = (d: Date) => true;

  constructor(private configStore: ConfigStoreService) {
    this.dateFormat = configStore.options.format;
    if (configStore.options.excludeWeekends) {
      this.weekendFilter = (d: Date): boolean => {
        const day = d.getDay();
        return day !== 0 && day !== 6;
      };
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes && changes.selectedDate) {
      this.matCalendar.activeDate = changes.selectedDate.currentValue;
    }
  }

  onSelectedChange(date) {
    this.selectedDateChange.emit(date);
  }

  onYearSelected(e) { }

  onUserSelection(e) { }
}
