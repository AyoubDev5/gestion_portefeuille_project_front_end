import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  public name_pro;

  constructor() { }

  ngOnInit(): void {
    this.name_pro = localStorage.getItem('name_pro');
    // console.log(this.name_pro);

  }

}
