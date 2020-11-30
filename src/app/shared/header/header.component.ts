import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  links: Array<string>;

  constructor() {
    this.links = ['home', 'optimizer', 'about', 'contacts']
  }

  ngOnInit(): void {
  }

}
