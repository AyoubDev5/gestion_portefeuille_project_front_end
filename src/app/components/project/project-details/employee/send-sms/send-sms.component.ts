import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthService } from 'src/app/services/auth.service';
import { DialogData } from '../employee.component';

@Component({
  selector: 'app-send-sms',
  templateUrl: './send-sms.component.html',
  styleUrls: ['./send-sms.component.css']
})
export class SendSmsComponent implements OnInit {

  emailForm: FormGroup;

  constructor(
    private formBuilder : FormBuilder, 
    private service : AuthService,
    public dialogRef: MatDialogRef<SendSmsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    @Inject(MAT_DIALOG_DATA) public emailData :any,
  ) {}

  onNoClick(): void {
    this.dialogRef.close();
    }

  ngOnInit(): void {
    this.emailForm = this.formBuilder.group({
      email : ['', Validators.required],
      text : ['', Validators.required],
    });
    //console.log("email", this.emailData)
    if(this.emailData){
      this.emailForm.controls['email'].setValue(this.emailData.email);
    }
  
  }
  newMessage(){
    // if(){
      if(this.emailForm.valid || this.emailData){
        console.log(this.emailForm.value);  
        this.service.sendEmail(this.emailForm.value)
        .subscribe({
          next:(res)=>{
          console.log(this.emailForm.value);      
        },
        error:(err)=>{
          console.log('err', err)
        }
        })
      }
    }
}
