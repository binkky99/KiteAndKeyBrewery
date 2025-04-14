import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { DashboardElementComponent } from '../dashboard-element/dashboard-element.component';
import { CommonModule, DecimalPipe } from '@angular/common';
import { AbstractControl, FormArray, FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatIconModule } from '@angular/material/icon';
import { MatFormField, MatInputModule } from '@angular/material/input';
import { BeerRecipe } from '../../services/beer-recipe.service';

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
  @Input() recipe!: BeerRecipe;
  @Output('onDelete') onDelete = new EventEmitter<number>();

  form!: FormGroup
    get controlArray(): FormArray {
      return this.form.get("items") as FormArray
    }
  
    constructor(private decimalPipe: DecimalPipe,
                private fb: FormBuilder) { }
  
    ngOnInit(): void {
      if (!this.recipe) return; 
  
      this.form = this.fb.group({
        name: [this.recipe.name, Validators.required],
        boilingTemp: [this.recipe.boilingTemp, [Validators.required, Validators.min(0)]],
        grainWeight: [this.recipe.grainWeight, [Validators.required, Validators.min(0)]],
        firstRest: [this.recipe.firstRest, [Validators.required, Validators.min(0)]],
        grainTemp: [this.recipe.grainTemp, [Validators.required, Validators.min(0)]],
        waterRatio: [this.recipe.waterRatio, [Validators.required, Validators.min(0)]],
      });
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
