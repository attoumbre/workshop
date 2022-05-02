import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Token } from '@angular/compiler';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListSchema } from '../models';
import { TokenStorageService } from './token-storage.service';

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
export class SectionService {

  constructor(private http: HttpClient,
    private token : TokenStorageService) { }

  
  createSection(name: string, id_t: any){
    //console.log(data)
    const data = {
      lib: name ,
      tableau:{
        id: id_t
    }  
    }
  
    return new Observable<boolean> ( (observer)=>{
      this.http.post(`api/sections/create`, data,httpOptions).subscribe(result =>{
        
        observer.next(true);
        
        observer.complete();
        
        console.log("bon result",result)
      }, error =>{
        observer.error(false);
        observer.complete();
      });

    } );
  }

  //j ai pasbesoin de cette requete car cascade type est Remove
  deleteSection(id: number){
    return new Observable<boolean> ( (observer)=>{
      this.http.delete(`api/sections/delete/sections/${id}`,httpOptions).subscribe(result => {console.log(result)
        
      }
      );
    });
  }

  getSectionBoard(id: number){
    return new Observable<boolean> ( (observer)=>{
      this.http.get(`api/sections/recup/${id}`,httpOptions).subscribe(result => {console.log(result)
        
      }
      );
    });
  }
  
  upDateSection(id: any, lib : any){

    
    const data = {
        id : id,
        lib : lib,
        tableau : {
          id : this.token.getToken("tableau").id
        }

    }
    console.log(data)
    return new Observable<boolean> ((observer)=>{
      this.http.put(`api/sections`, data, httpOptions).subscribe(result => {console.log(result)
      })
    });

  }
  
}
