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
    let userName = localStorage.getItem('userName')!
    if(userName){
      return true
    }else{
      return false;
    }
  }

}
