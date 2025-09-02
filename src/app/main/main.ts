import { Component } from '@angular/core';
import { Toolbar } from '../components/toolbar/toolbar';
import { Sidebar } from '../components/sidebar/sidebar';

@Component({
  selector: 'app-main',
  imports: [Toolbar, Sidebar],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
