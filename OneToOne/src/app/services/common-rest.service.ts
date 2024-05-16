import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CommonRestService {
  domain: string;
  
  constructor(private http:HttpClient) { 
    this.domain='http://localhost:8080'; 
  }

  public get(endPoint: string):Observable<any>{
    return this.http.get(this.domain+endPoint);
  }

  public getWithParam(endPoint: string, params:HttpParams):Observable<any>{
    return this.http.get(this.domain+endPoint, {params:params});
  }

  public getById(id:number,endPoint: string):Observable<any>{
    return this.http.get(this.domain+endPoint+id);
  }

  public post(endPoint: string, body:any):Observable<any>{
    return this.http.post(this.domain+endPoint, body);
  }

  public update(id:number,model:object,endPoint:string):Observable<any>{
    return this.http.put<any>(this.domain+endPoint+id,model);
   }

  public delete(endPoint: string,id:number):Observable<any>{
    return this.http.delete(this.domain+endPoint+id);
  }

  onSubmit(form: FormGroup, id: number, isUpdate: boolean,modelType:string): Observable<any> {
    if (isUpdate) {
      return this.update(id, form.value,modelType+"/v1/update/");
    } else {
      return this.post(modelType+"/v1/add",form.value);
    }
  }
}
