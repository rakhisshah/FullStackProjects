import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { analyzeAndValidateNgModules } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class ApiserviceService {

  constructor(private _http:HttpClient) { }

  //connect frontend to backend
  
  getAllData(): Observable <any>

  {
    return this._http.get("http://localhost:3000/books"); 
  }


  //get Book type dropdown
  getBookType():Observable <any>
  {
    return this._http.get("http://localhost:3000/booktype");
  }


  

  //get Book type dropdown
  getGenreType():Observable <any>
  {
    return this._http.get("http://localhost:3000/genretype");
  }


  //create data

  createData(data:any): Observable<any>
  {
    console.log(data,'create api==>')
    return this._http.post("http://localhost:3000/books", data);
  }


  //deactivate data or here book

   deactivateData(Book_id:any): Observable<any>
  {
    let bookid=Book_id;
    let apiUrl="http://localhost:3000/books/status/" + bookid
    return this._http.put(apiUrl,data); 
  
  } 

  //Update data

  updateData(data:any,Book_id:any):Observable <any>
  {
    let bookid=Book_id;
    let apiUrl="http://localhost:3000/books/" + bookid; 

    return this._http.put(apiUrl,data); 
  }

  //get single data for edit

   getSingleData(Book_id:any): Observable <any>
   {

    let bookid=Book_id;
    let apiUrl="http://localhost:3000/books/" + bookid; 
     return this._http.get(apiUrl);
    
    //return this._http.get('"http://localhost:3000/books/'+ bookid + '"');
    } 

}
function data(apiUrl: string, data: any): Observable<any> {
  throw new Error('Function not implemented.');
}

