import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ApiserviceService } from '../apiservice.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private service:ApiserviceService,private router:ActivatedRoute) { }

  errormsg:any;
  succsessmsg:any;
  getParamId:any;
  booktype:any;
  genretype:any;

  ngOnInit(): void {

    //to fill book type drop down list
    this.service.getBookType().subscribe((res)=>{
      console.log(res,"res==>");
      this.booktype=res.data;
      console.log(this.booktype);
    });

     //to fill genre type drop down list
     this.service.getGenreType().subscribe((res)=>{
      console.log(res,"res==>");
      this.genretype=res.data;
      console.log(this.genretype);
    });

    //to show selcted book in deatil form for edit functionality
    this.getParamId=this.router.snapshot.paramMap.get('bookid');
    //console.log(this.router.snapshot.paramMap.get('bookid'),'getid');
      if(this.getParamId!=null)
      {
      this.service.getSingleData(this.getParamId).subscribe((res)=>{
      console.log(res,'res==>');
      this.bookForm.patchValue({
        bookid:res.data[0].Book_id,
        booktitle:res.data[0].Book_title,
        bookauthor:res.data[0].Book_author,
        booktype:res.data[0].Book_type_id,
        genretype:res.data[0].Book_genre_id,
        publication:res.data[0].Publication,
        noofpages:res.data[0].No_of_pages,
        bookprice:res.data[0].Book_price

      })
    })
  }
  }

  bookForm=new FormGroup({
    'booktitle':new FormControl('',Validators.required),
    'bookauthor':new FormControl('',Validators.required),
    'booktype': new FormControl('',Validators.required),
    'genretype': new FormControl('',Validators.required),
    'publication': new FormControl('',Validators.required),
    'noofpages': new FormControl('',Validators.required),
    'bookprice': new FormControl('',Validators.required)
    


  });

  //Create new book

  bookSubmit()
  {
    console.log("hi");
    if(this.bookForm.valid)
    {

      console.log("check");
      console.log(this.bookForm.value);
      this.service.createData(this.bookForm.value).subscribe((res)=>{
        console.log(res,'res=>')
        this.bookForm.reset();
        this.succsessmsg=res.message;
      })
    }
    else{
      this.errormsg="all fields are required!!!"
    }

  }
  //Update book

  bookUpdate()
  {
    console.log(this.bookForm.value,'update Form')

    if(this.bookForm.valid)
    {
      this.service.updateData(this.bookForm.value,this.getParamId).subscribe((res)=>{
        console.log(res,'resupdated'); 
        this.succsessmsg=res.message;
      });

    }else{
        this.errormsg="all fileds are required"; 
    }
  }


}
