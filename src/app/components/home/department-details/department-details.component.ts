import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CalendarOptions } from '@fullcalendar/angular';
import { BsModalService } from 'ngx-bootstrap/modal';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-department-details',
  templateUrl: './department-details.component.html',
  styleUrls: ['./department-details.component.css']
})

export class DepartmentDetailsComponent implements OnInit {
  id: any;
  title: string;
  start: any;
  end: any;
  Events: any[] = [];
  modalRef: any;
  @ViewChild('template') template!: string;
  constructor(
    private service: AuthService,
    private route: ActivatedRoute,
    private modalService: BsModalService,
  ) {}
  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.id = params['id'];
    setTimeout(() => {
      return this.service.getProjectsByDepIdCalendar(this.id)
        .subscribe((res: any) => {
          this.Events = res.map(evt => {
            return {title: evt.title, start: evt.start_date, end: evt.end_date}
          });
          //console.log(this.Events);
        });
    }, 2200);
    setTimeout(() => {
      this.calendarOptions = {
        initialView: 'dayGridMonth',
        dateClick: this.onDateClick.bind(this),
        eventClick: this.handalDateClick.bind(this),
        events: this.Events,
        eventSources: this.Events,
      };
      }, 2500);
    });
  }
  calendarOptions: CalendarOptions = {
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    initialView: 'dayGridMonth',
    weekends: true,
    editable: true,
    selectable: true,
    selectMirror: true,
    dayMaxEvents: true,
    events: this.Events,
  };
  config = {
    animated: true
  };
  toggleWeekends() {
    this.calendarOptions.weekends = !this.calendarOptions.weekends // toggle the boolean!
  }
  handalDateClick(arg:any){
    //console.log("arg", arg);
    this.title = arg.event._def.title;
    this.start = arg.event.start;  
    this.end = arg.event.end;  

    this.modalRef = this.modalService.show(this.template, this.config);  
  }
  onDateClick(res: any) {
    alert('Clicked on date : ' + res.dateStr);
    //console.log(res)
  }
}
