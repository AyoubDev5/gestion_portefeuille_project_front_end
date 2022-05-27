import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.css']
})
export class DialogComponent implements OnInit {

  public formDep: FormGroup;

  constructor( private dialogService: AuthService,private dialogRef : MatDialogRef<DialogComponent> ) { }

  ngOnInit(): void {
    this.initForm();
    // depName: new FormControl('', [Validators.required])
  }

  initForm() {
    this.formDep = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  addDepartment(){
      if(this.formDep.valid){
        this.dialogService.postDep(this.formDep.value)
        .subscribe({
          next:(res)=>{
            //console.log(this.formDep.value);
            alert('Department added successfuly');
            this.formDep.reset();
            this.dialogRef.close('save');
            location.reload();
          },
          error:(err)=>{
            console.log('err', err)
          }
        })
      }
  }


}
