import { Component, OnInit } from '@angular/core';
import { ApiserviceService } from '../apiservice.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-read',
  templateUrl: './read.component.html',
  styleUrls: ['./read.component.css']
})
export class ReadComponent implements OnInit {

  constructor(private service:ApiserviceService) { }

  errormsg:any;
  succsessmsg:any;
  getParamId:any;

  readdata:any;

  ngOnInit(): void {
    this.service.getAllData().subscribe((res)=>{
      console.log(res,"res==>");
      this.readdata=res.data;
      console.log(this.readdata);
    });
  }


  //get deactivated

/*   deactivateBook(bookid :any)
  {
    console.log(bookid,'deactivatedbook=>');
    this.service.deactivateData(id,data   )
  } */


  bookDeactivate(bookid :any)
  {
    console.log(bookid,'Deactive Book==>')
    this.service.deactivateData(bookid).subscribe((res)=>{
    console.log(res,'Deactivated==>')
    this.succsessmsg=res.message;
    this.service.getAllData().subscribe((res)=>{
      console.log(res,"res==>");
      this.readdata=res.data;
      console.log(this.readdata);
    });

    });
    

  
  }




}


