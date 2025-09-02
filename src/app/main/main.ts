import { Component } from '@angular/core';
import { Toolbar } from '../components/toolbar/toolbar';

@Component({
  selector: 'app-main',
  imports: [Toolbar],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
