import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { AuthService } from 'src/app/services/auth.service';
import {MatDialogRef, MAT_DIALOG_DATA} from "@angular/material/dialog";
@Component({
  selector: 'app-dialog-new-team',
  templateUrl: './dialog-new-team.component.html',
  styleUrls: ['./dialog-new-team.component.css']
})
export class DialogNewTeamComponent implements OnInit {

  freshList = ["chef_team", "nbr_employee", "isActive" ]
  teamForm: FormGroup;
  actionBtn : string = "Save";
  constructor(
    private service : AuthService,
    @Inject(MAT_DIALOG_DATA) public editData :any,
    private dialogRef : MatDialogRef<DialogNewTeamComponent>,) { }

  ngOnInit(): void {
    this.initForm()
  }


  initForm() {
    this.teamForm = new FormGroup({
      chef_team: new FormControl('', [Validators.required]),
      nbr_employee: new FormControl('', [Validators.required]),
    });
  }

  addTeam(){
      if(this.teamForm.valid){
        this.service.postNewTeam(this.teamForm.value)
        .subscribe({
          next:(res)=>{
            //console.log(this.teamForm.value);
            alert('Team added successfuly');
            this.teamForm.reset();
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
