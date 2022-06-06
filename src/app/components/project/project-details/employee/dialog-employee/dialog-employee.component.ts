import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-dialog-employee',
  templateUrl: './dialog-employee.component.html',
  styleUrls: ['./dialog-employee.component.css']
})
export class DialogEmployeeComponent implements OnInit {

  emplForm:FormGroup
  actionBtn : string = "Save";
  public idt:any;
  constructor(
    private formBuilder : FormBuilder,
    private service : AuthService,
    @Inject(MAT_DIALOG_DATA) public editData :any,
    private dialogRef : MatDialogRef<DialogEmployeeComponent>,
    private dialog:MatDialog,
  ) { }

  ngOnInit(): void {
    this.idt = localStorage.getItem("id_team");
    this.emplForm = this.formBuilder.group({
      prenom : ['', Validators.required],
      nom: ['', Validators.required],
      specialite: ['', Validators.required],
      email: ['', Validators.required],
    });
    //console.log("editData", this.editData);
    if(this.editData){
      this.actionBtn = "Update";
      this.emplForm.controls['nom'].setValue(this.editData.nom);
      this.emplForm.controls['prenom'].setValue(this.editData.prenom);
      this.emplForm.controls['specialite'].setValue(this.editData.specialite);
      this.emplForm.controls['email'].setValue(this.editData.email);
    }
  }
  addEmpl(){
    if(!this.editData){
      if(this.emplForm.valid){
        this.service.postEmployByTeamId(this.emplForm.value)
        .subscribe({
          next:(res)=>{
            //console.log(this.emplForm.value);
            alert('employee added successfuly');
            this.emplForm.reset();
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
        this.updateEmploye()
      )
  }
  updateEmploye(){
    this.service.updateEmp(this.emplForm.value, this.editData.id)
    .subscribe({
      next:(res) => {
        alert("Employee updated successfuly");
        this.emplForm.reset();
        this.dialogRef.close('update');
      },
      error:(err)=>{
        console.log('err', err);

      }
    })
  }
}
