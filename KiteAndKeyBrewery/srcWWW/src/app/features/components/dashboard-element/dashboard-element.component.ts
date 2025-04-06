import { Component, Input } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIcon } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-element',
  imports: [MatCardModule, MatDividerModule, MatIcon],
  templateUrl: './dashboard-element.component.html',
  styleUrl: './dashboard-element.component.css'
})
export class DashboardElementComponent {
  @Input('titleText') titleText : string = '';
  @Input('icon') icon : string = '';

}
