import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
const httpOptions = {
  headers: new HttpHeaders({ 
    
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With'
  })
};
@Injectable({
  providedIn: 'root'
})
export class FichesService {

  constructor(private http : HttpClient) { }
  getFicheSectionBoard(id_s:number): any{
    return new Observable<any> ( (observer)=>{
      this.http.get(`api/fiches/recup/${id_s}`,httpOptions)
      });
  }

  update(fiches: any , idSection: any){
    const data = {
      id : fiches.id,
      date : fiches.date,
      description: fiches.description ,
      temps : fiches.temps,
      section : {
        id : idSection
      }

  }
  console.log("fiche", data)
  return new Observable<boolean> ((observer)=>{
    this.http.put(`api/fiches`, data, httpOptions).subscribe(result => {console.log(result)
    })
  });
  }
}
