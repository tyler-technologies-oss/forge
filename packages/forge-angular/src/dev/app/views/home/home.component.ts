import { Component } from '@angular/core';
import { DemoCardComponent } from '../../components/demo-card/demo-card.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [DemoCardComponent]
})
export class HomeComponent {}
