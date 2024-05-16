import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders, HttpParams} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Course } from '../models/course';
import { FormGroup } from '@angular/forms';

@Injectable({
  providedIn: 'root'
})

export class CourseServiceService {
  domain: string;
  course: any;
  courseForm: any;
  isUpdate: any;
  courseService: any;
  router: any;
  constructor(private http:HttpClient) { 
    this.domain='http://localhost:8080'; 
  }
  // public getAllCourses():Observable<any>{
  //   return this.http.get<Course[]>(`${this.domain}/course/v1/all`);
  // }

  // public getAllCourseList(courseName:string):Observable<any>{
  //   let params=new HttpParams().set('courseName',courseName)
  //   return this.http.get<Course[]>(`${this.domain}/course/v1/list`,{params:params});
  // }

  // getAllCourseList(courseName?: string): Observable<Course[]> {
  //   let params = new HttpParams();
  //   if (courseName) {
  //     params = params.set('courseName', courseName);
  //   }
  //   return this.http.get<Course[]>(`${this.domain}/course/v1/list`, { params: params });
  // }


  // public getCourseById(courseId:number):Observable<Course>{
  //   return this.http.get<Course>(`${this.domain}/course/v1/find/${courseId}`);
  // }

  // public addCourse(course:Course):Observable<Course>{
  //    return this.http.post<Course>(`${this.domain}/course/v1/add`,course);
  // }

  // public updateCourse(courseId:number,course:object):Observable<Course>{
  //   return this.http.put<any>(`${this.domain}/course/v1/update/${courseId}`,course);
  // }

  // public deleteCourse(courseId:number):Observable<void>{
  //   return this.http.delete<void>(`${this.domain}/course/v1/delete/${courseId}`);
  // }
  // onSubmitCourse(courseForm: FormGroup, courseId: number, isUpdate: boolean): Observable<any> {
  //   if (isUpdate) {
  //     return this.updateCourse(courseId, courseForm.value);
  //   } else {
  //     return this.addCourse(courseForm.value);
  //   }
  // }
}
