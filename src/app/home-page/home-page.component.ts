import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContactUsComponent } from './contact-us/contact-us.component';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.css']
})
export class HomePageComponent implements OnInit {

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
  }
  contactUs(){
    this.dialog.open(ContactUsComponent,{width: '400px', height: '400px'}).afterClosed().subscribe((value:any)=>{
      console.log(value)
    })
  }
}
