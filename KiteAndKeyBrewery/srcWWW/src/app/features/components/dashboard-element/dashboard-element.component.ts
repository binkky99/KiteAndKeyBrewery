import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-element',
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatIconModule],
  templateUrl: './dashboard-element.component.html',
  styleUrl: './dashboard-element.component.css'
})
export class DashboardElementComponent {
  @Input('titleText') titleText : string = '';
  @Input('icon') icon : string = '';
  @Output('onDelete') onDelete = new EventEmitter<void>();
}
