import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { ListSchema } from '../models';
import { SectionService } from './section.service';
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
export class BoardService {
  private boardList: any[] = [];
  list!: ListSchema;
  sections:any[] =[
    {nom : "En cours"},
    {nom : "A venir"},
    {nom : "terminé"}
    
  ];
  constructor(private http: HttpClient, 
    private token: TokenStorageService,
    private section: SectionService) { }

  createBoard(bName: string,  u_id: any){
    const data = {
      nom: bName ,
      userT:{
        id: u_id
    }  
    }

    //console.log(data)
    return new Observable<boolean> ( (observer)=>{
      this.http.post(`api/tableau/create`, data,httpOptions).subscribe((result: any )=>{
        
        observer.next(true);
    
        observer.complete();
        //this.token.saveToken("tableau",result.id)
      for (const index in this.sections) {
        //console.log("index", this.sections[index].nom)
        //this.list.name =  this.sections[index].nom
        this.section.createSection(this.sections[index].nom, result.id).subscribe(res=>console.log(res))
  }
      }, error =>{
        observer.error(false);
        observer.complete();
      });

    } );
  }

  getlist(): any[] {
    return this.boardList;
  }
  deleteBoard(id:number): any{
    //let endPoint =`${id}`;
    return new Observable<boolean> ( (observer)=>{
      this.http.delete(`api/tableau/${id}`,httpOptions).subscribe((result)=>{
      observer.next(true)
      observer.complete()
      const index: number = this.boardList.indexOf(id);
      if (index !== -1) {
       this.boardList.splice(index, 1);
      
      
    }        
      console.log("delete", result)
      },error =>{
        observer.next(false)
        observer.complete()
      }
    
    )
    });
  }
  checkUserBoard(id: number){
    const data = {
      idUser: id
    }

    return new Observable<boolean> ( (observer)=>{
      
      this.http.post(`api/tableau/perso`, data,httpOptions).subscribe((result : any) =>{
        
        observer.next(true);
        observer.complete();
        if(this.boardList != []){
          if(this.boardList.length < result.length){
            for (const index in result) {
              let inData = false;
              for( const item in this.boardList){
                if(this.boardList[item] ==  result[index]){
                  inData = true
                }
              }
              if(!inData){
                this.boardList.push(result[index])
              } 
            }
          }
        }else{
          for (const id in result){
            this.boardList.push(result[id])
          }
        }
        
        //console.log("bon result",result)
      }, error =>{
        observer.error(false);
        observer.complete();
      });

    } );
  }
}
