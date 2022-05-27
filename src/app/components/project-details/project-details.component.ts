import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-project-details',
  templateUrl: './project-details.component.html',
  styleUrls: ['./project-details.component.css']
})
export class ProjectDetailsComponent implements OnInit {
  public idprojet: number;

  constructor(
    private router: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.router.params.subscribe((params) => {
    this.idprojet = params['id'];
    localStorage.setItem('id_pro', String(this.idprojet));
  })
}
}
