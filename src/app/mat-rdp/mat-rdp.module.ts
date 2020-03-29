import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatRdpComponent } from './mat-rdp/mat-rdp.component';
import { PickerOverlayComponent } from './picker-overlay/picker-overlay.component';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { OverlayModule } from '@angular/cdk/overlay';

import { CalendarComponent } from './calendar/calendar.component';
import { DATE } from './services/range-store.service';


@NgModule({
  declarations: [
    MatRdpComponent,
    CalendarComponent,
    PickerOverlayComponent,
  ],
  imports: [
    CommonModule,
    MatFormFieldModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatInputModule,
    MatButtonModule,
    MatTooltipModule,
    OverlayModule
  ],
  providers: [
    {provide: DATE, useValue: new Date()}
  ],
  entryComponents: [PickerOverlayComponent],
  exports: [MatRdpComponent]
})
export class MatRdpModule { }
