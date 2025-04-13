import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BeerRecipeService, BeerRecipe } from '../../services/beer-recipe.service';
import { MashCalculatorComponent } from '../../components/mash-calculator/mash-calculator.component';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-beer-recipe-dashboard',
  imports: [
    CommonModule,
    MashCalculatorComponent,
    MatIconModule,
    MatButtonModule],
  providers: [BeerRecipeService],
  templateUrl: './beer-recipe-dashboard.component.html',
  styleUrl: './beer-recipe-dashboard.component.css'
})
export class BeerRecipeDashboard {
  constructor(public beerRecipeService: BeerRecipeService) { }

  public createNewRecipe() {
    this.beerRecipeService.getDefaultProperties().subscribe(defaultRecipe => {
      this.beerRecipeService.addNewRecipe(defaultRecipe);
    })
  }
}
