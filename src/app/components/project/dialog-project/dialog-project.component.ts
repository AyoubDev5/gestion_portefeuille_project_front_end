import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";

import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';

import { DatePipe } from '@angular/common';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-dialog-project',
  templateUrl: './dialog-project.component.html',
  styleUrls: ['./dialog-project.component.css']
})
export class DialogProjectComponent implements OnInit {

  freshList = ["title", "start_date", "end_date","created_at","modify_at","status","reason" ]
  projectForm: FormGroup;
  actionBtn : string = "Save";
  startDate: any;
  endDate: any;
  public id_dep: any;

  pipe = new DatePipe('en-US');
//Select handle
  options: any[] = [
    {
      id: true,
      title: 'Complete',
    },
    {
      id: false,
      title: 'Incomplete',
    },
  ];
  selectedStatus: any;

  reasons: any[] = [
    {
      id: 1,
      title: 'reason 1',
    },
    {
      id: 2,
      title: 'reason 2',
    },
  ];
  selectedReason: any;
  dataSource!: MatTableDataSource<any>;


  constructor(
    private formBuilder : FormBuilder, 
    private service : AuthService, 
    @Inject(MAT_DIALOG_DATA) public editData :any,
    private dialogRef : MatDialogRef<DialogProjectComponent>,
    private dialog:MatDialog,
    private route: ActivatedRoute,
  ) {  

  }

  ngOnInit(): void {
    this.id_dep = localStorage.getItem('id_dep');
    this.projectForm = this.formBuilder.group({
      title : ['', Validators.required],
      start_date: ['', Validators.required],
      end_date: ['', Validators.required],
      description: ['', Validators.required],
      department : [this.id_dep, Validators.required],
      reason : ['', Validators.required],
      user : ['1', Validators.required],
    });
    console.log("editData", this.editData);
    if(this.editData){
      this.actionBtn = "Update";
      this.projectForm.controls['title'].setValue(this.editData.title);
      this.projectForm.controls['start_date'].setValue(this.editData.start_date);
      this.projectForm.controls['end_date'].setValue(this.editData.end_date);
      this.projectForm.controls['description'].setValue(this.editData.description);
      this.projectForm.controls['reason'].setValue(this.editData.reason);
    }
  }

  addProject(selectedStatus){
    if(!this.editData){
      if(this.projectForm.valid){
        this.service.postProject(this.projectForm.value)
        .subscribe({
          next:(res)=>{
            alert('project added successfuly');
            this.projectForm.reset();
            this.dialogRef.close('save');
            // this.service.getProjectsByDepId(this.id_dep)
            // .subscribe({
            //   next:(res)=>{
            //     console.log("GetAllProjects",res);
            //     this.dataSource = new MatTableDataSource(res);
            //   },
            //   error:(err)=>{console.log('err', err);
            //   }
            // });            
            window.location.reload();
          },
          error:(err)=>{
            console.log('err', err)
          }
        })

      }
    }
      else(
        this.updateProduct(this.selectedReason)
      )
  }


  updateProduct(selectedReason){
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

}
