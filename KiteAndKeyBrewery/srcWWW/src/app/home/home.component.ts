import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MashCalculatorComponent } from '../components/mash-calculator/mash-calculator.component';
import { MashDataService } from '../services/mash-data.service';

@Component({
  selector: 'app-home',
  imports: [ CommonModule, MashCalculatorComponent],
  providers: [MashDataService],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  constructor(public mashDataService: MashDataService) { }
}
