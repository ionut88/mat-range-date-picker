import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { MatPickRangeComponent } from './mat-pick-range/mat-pick-range.component';
import { PickerOverlayComponent } from './picker-overlay/picker-overlay.component';

import { OverlayModule } from '@angular/cdk/overlay';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatTooltipModule } from '@angular/material/tooltip';

import { CalendarComponent } from './calendar/calendar.component';
import { DATE } from './services/range-store.service';

@NgModule({
  declarations: [MatPickRangeComponent, CalendarComponent, PickerOverlayComponent],
  imports: [CommonModule, MatFormFieldModule, MatDatepickerModule, MatNativeDateModule, MatInputModule, MatButtonModule, MatTooltipModule, OverlayModule],
  providers: [{ provide: DATE, useValue: new Date() }],
  exports: [MatPickRangeComponent],
})
export class MatPickRangeModule {}
