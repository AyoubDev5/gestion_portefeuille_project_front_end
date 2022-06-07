import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog-tache',
  templateUrl: './dialog-tache.component.html',
  styleUrls: ['./dialog-tache.component.css']
})
export class DialogTacheComponent implements OnInit {

  options: any[] = [
    {
      id: 1,
      title: 'In Progress',
    },
    {
      id: 2,
      title: 'Completed',
    },
    {
      id: 3,
      title: 'In Completed',
    },
  ];
  startDate = new Date(Date.now());

  selectedEmp;
  selectedStatus;
  formTache : FormGroup;
  actionBtn : string = "Save";
  actionTitle: string = "New"
  public idproject : any;
  AllProject: any;
  newIdEmp: any;

  constructor(
    private formBuilder : FormBuilder,
    private service : AuthService,
    @Inject(MAT_DIALOG_DATA) public editData :any,
    private dialogRef : MatDialogRef<DialogTacheComponent>,
    private dialog:MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idproject = localStorage.getItem('idpro');
    //console.log("idproject",this.idproject);
    this.formTache = this.formBuilder.group({
      name : ['', Validators.required],
      end_date : ['', Validators.required],
      status: ['', Validators.required],
      employee:[this.selectedEmp, Validators.required],
      project:[this.idproject, Validators.required],
    });
    //console.log('empp',this.selectedEmp)
    //console.log("this.formTache",this.formTache.value);
    if(this.editData){
      this.actionBtn = "Update";
      this.actionTitle = "Update"
      this.formTache.controls['name'].setValue(this.editData.name);
      this.formTache.controls['end_date'].setValue(this.editData.end_date);
      this.formTache.controls['employee'].setValue(this.editData.employee);
      this.formTache.controls['project'].setValue(this.editData.project);
      this.formTache.controls['status'].setValue(this.editData.status);
    }

    this.service.getEmployByTeamId_TeamByProjId(this.idproject)
    .subscribe(res => {
      this.AllProject = res;
      //console.log('all',this.AllProject)
    })
  }

  addTache(){
    if(!this.editData){
      if(this.formTache.valid){
        this.service.postTacheByProjectId(this.formTache.value)
        .subscribe({
          next:(res)=>{
            //console.log(this.formTache.value);
            alert('Tache added successfuly');
            this.formTache.reset();
            this.dialogRef.close('save');
            //location.reload();
          },
          error:(err)=>{
            console.log('err', err)
          }
        })
      }
    }
      else(
        this.updateTache()
      )
  }

  updateTache(){
    this.service.updateTacheById(this.formTache.value, this.editData.id)
    .subscribe({
      next:(res) => {
        alert("Tache updated successfuly");
        this.formTache.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        console.log('err', err);
      }
    })
  }
}
