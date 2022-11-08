import { Component, NgZone, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-error-en-libro',
  templateUrl: './error-en-libro.component.html',
  styleUrls: ['./error-en-libro.component.scss'],
})
export class ErrorEnLibroComponent implements OnInit {
  constructor(private router: Router, private zone: NgZone) {}

  ngOnInit() {}

  clickAtras() {
    this.zone.run(() => {
      this.router.navigate(['/home']);
    });
  }
}
