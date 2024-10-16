import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SaveFileModalComponent } from 'src/app/component/save-file-modal/save-file-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { FormatNamePipe } from 'src/app/pipes/format-name.pipe';
import { FormatFileSizePipe } from 'src/app/pipes/format-file-size.pipe';
import { TimeFormatPipe } from 'src/app/pipes/time-format.pipe';



@NgModule({
  declarations: [SaveFileModalComponent, FormatNamePipe, FormatFileSizePipe, TimeFormatPipe],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
  ],
 
  exports: [CommonModule, SaveFileModalComponent, FormsModule,
    IonicModule,
    ReactiveFormsModule, FormatNamePipe, FormatFileSizePipe, TimeFormatPipe],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]

})
export class SharedModule { }
