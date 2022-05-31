import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

import { MatDialog } from '@angular/material/dialog';
import { DialogNewTeamComponent } from './dialog-new-team/dialog-new-team.component';
import { ActivatedRoute } from '@angular/router';

import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-dialogproject',
  templateUrl: './dialogproject.component.html',
  styleUrls: ['./dialogproject.component.css']
})
export class DialogprojectComponent implements OnInit {

  freshList = ["title", "start", "endd","created_at","modify_at","isActive" ]
  projectForm: FormGroup;
  actionBtn : string = "Save";
  public selectedTeam: any;
  startDate: any;
  endDate: any;
  public id_dep: any;

  pipe = new DatePipe('en-US');
//Select handle
  options: any[] = [
    {
      id: true,
      title: 'Active',
    },
    {
      id: false,
      title: 'Not Active',
    },
  ];

  selectedStatus: any;

  constructor(
    private formBuilder : FormBuilder, 
    private service : AuthService, 
    @Inject(MAT_DIALOG_DATA) public editData :any,
    private dialogRef : MatDialogRef<DialogprojectComponent>,
    private dialog:MatDialog,
    private route: ActivatedRoute,
  ) {  

  }

  ngOnInit(): void {
    this.id_dep = localStorage.getItem('id_dep');
    this.projectForm = this.formBuilder.group({
      title : ['', Validators.required],
      start: ['', Validators.required],
      endd: ['', Validators.required],
      description: ['', Validators.required],
      department : [this.id_dep, Validators.required],
      team : ['', Validators.required],
      isActive : ['', Validators.required],
    });
    console.log("editData", this.editData);
    if(this.editData){
      this.actionBtn = "Update";
      this.projectForm.controls['title'].setValue(this.editData.title);
      this.projectForm.controls['start'].setValue(this.editData.start);
      this.projectForm.controls['endd'].setValue(this.editData.endd);
      this.projectForm.controls['description'].setValue(this.editData.description);
      this.projectForm.controls['team'].setValue(this.editData.team);
      this.projectForm.controls['isActive'].setValue(this.editData.isActive);
    }

    this.fetchAllTeams();
  }

  addProject(selectedTeam, selectedStatus){
    if(!this.editData){
      if(this.projectForm.valid){
        this.service.postProject(this.projectForm.value)
        .subscribe({
          next:(res)=>{
            alert('project added successfuly');
            this.projectForm.reset();
            this.dialogRef.close('save');
            // location.reload();
          },
          error:(err)=>{
            console.log('err', err)
          }
        })

      }
    }
      else(
        this.updateProduct()
      )
  }
  
  updateProduct(){
    this.service.updateProject(this.projectForm.value, this.editData.id)
    .subscribe({
      next:(res) => {
        alert("project updated successfuly");
        this.projectForm.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        console.log('err', err);
        
      }
    })
  }
  public teams: any[] =[];

  //fetch all teams
  fetchAllTeams(){
    this.service.allTeams().subscribe(teams=>{
      this.teams=teams;
      //console.log(this.teams);
    })
  }


  openDialogTeam() {
    this.dialog.open(DialogNewTeamComponent, {
      width:"40%" ,
    })
  }
}
