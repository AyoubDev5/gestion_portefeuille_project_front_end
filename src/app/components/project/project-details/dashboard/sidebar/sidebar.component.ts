import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {
  id_dep: any;
  id_pro: any;

  constructor() { }

  ngOnInit(): void {
    this.id_dep = localStorage.getItem('id_dep');
    this.id_pro = localStorage.getItem('idpro');
  }

}
