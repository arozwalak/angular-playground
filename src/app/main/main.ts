import { Component } from '@angular/core';
import { Toolbar } from '../components/toolbar/toolbar';
import { Sidebar } from '../components/sidebar/sidebar';
import { RouterOutlet, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-main',
  imports: [Toolbar, Sidebar, RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './main.html',
  styleUrl: './main.scss',
})
export class Main {}
