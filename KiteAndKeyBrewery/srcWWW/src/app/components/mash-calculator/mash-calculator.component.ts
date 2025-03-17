import { Component, Input, OnInit } from '@angular/core';
import { DashboardElementComponent } from '../dashboard-element/dashboard-element.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { MashEntry } from '../../services/mash-data.service';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-mash-calculator',
  imports: [
    CommonModule,
    DashboardElementComponent,
    MatIconModule,
    MatInputModule,
    MatFormField,
    ReactiveFormsModule,
  ],
  providers: [
    DecimalPipe
  ],
  templateUrl: './mash-calculator.component.html',
  styleUrl: './mash-calculator.component.css'
})
export class MashCalculatorComponent implements OnInit {
  @Input() data: MashEntry[] | null = [];

  form!: FormGroup
    get controlArray(): FormArray {
      return this.form.get("items") as FormArray
    }
  
    constructor(private decimalPipe: DecimalPipe,
                private fb: FormBuilder) { }
  
    ngOnInit(): void {
      if (!this.data) return; 
  
      this.form = this.fb.group({
        items: this.fb.array(this.data.map(r => new FormControl(r, Validators.min(0))))
      })
    }
  
    formatInput(formControl: AbstractControl | null, event: any, format: string) {
      const inputVal = event.target.value;
      const num = Number(inputVal);
  
      if (!isNaN(num)) {
        formControl?.patchValue({
          ...formControl.value,
          value: num
        });
        event.target.value = this.decimalPipe.transform(num, format);
      } else {
        formControl?.patchValue({
          ...formControl.value,
          value: 0.00
        });
        event.target.value = '';
      }
    }
}
