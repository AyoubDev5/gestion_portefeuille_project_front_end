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

  formTache : FormGroup;
  actionBtn : string = "Save";
  public idemp : any;

  constructor(
    private formBuilder : FormBuilder,
    private service : AuthService,
    @Inject(MAT_DIALOG_DATA) public editData :any,
    private dialogRef : MatDialogRef<DialogTacheComponent>,
    private dialog:MatDialog,
    private route: ActivatedRoute,
  ) { }

  ngOnInit(): void {
    this.idemp = localStorage.getItem('idemp');
    //console.log("emp",this.idemp);
    this.formTache = this.formBuilder.group({
      name : ['', Validators.required],
      isActive: ['', Validators.required],
      employee:[this.idemp, Validators.required],
    });
    //console.log("editData", this.editData);
    if(this.editData){
      this.actionBtn = "Update";
      this.formTache.controls['name'].setValue(this.editData.name);
      this.formTache.controls['isActive'].setValue(this.editData.isActive);
      this.formTache.controls['employee'].setValue(this.editData.employee);
    }

  }

  addTache(){
    if(!this.editData){
      if(this.formTache.valid){
        this.service.postTacheByEmplId(this.formTache.value)
        .subscribe({
          next:(res)=>{
            //console.log(this.formTache.value);
            alert('Tache added successfuly');
            this.formTache.reset();
            this.dialogRef.close('save');
            location.reload();
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
