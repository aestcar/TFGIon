import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-conocenos',
  templateUrl: './conocenos.component.html',
  styleUrls: ['./conocenos.component.scss'],
})
export class ConocenosComponent implements OnInit {
  constructor() {}

  ngOnInit() {}

  redClick(letra: string) {
    switch (letra) {
      case 'f': {
        window.location.href = 'https://facebook.com';
        break;
      }
      case 'i': {
        window.location.href = 'https://instagram.com';
        break;
      }
      case 't': {
        window.location.href = 'https://twitter.com';
        break;
      }
      case 'y': {
        window.location.href = 'https://youtube.com';
        break;
      }
    }
  }
}
