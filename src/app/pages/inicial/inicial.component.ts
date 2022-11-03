import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-inicial',
  templateUrl: './inicial.component.html',
  styleUrls: ['./inicial.component.css'],
})
export class InicialComponent implements OnInit {

  constructor() { }

  ngOnInit() {}

  estaRegistrado():boolean{
    let user = JSON.parse(localStorage.getItem('user'));
    if(user){
      return true
    }else{
      return false;
    }
  }

}
