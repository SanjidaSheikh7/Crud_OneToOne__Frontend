import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SearchResult } from 'src/app/models/search-result';
import { Teacher } from 'src/app/models/teacher';
import { CommonRestService } from 'src/app/services/common-rest.service';
import { TeacherServiceService } from 'src/app/services/teacher-service.service';

@Component({
  selector: 'app-show-teacher-info',
  templateUrl: './show-teacher-info.component.html',
  styleUrls: ['./show-teacher-info.component.css']
})
export class ShowTeacherInfoComponent implements OnInit {
  teachers:Teacher[]=[];
  teacherName:string;

  searchResult: SearchResult = {
    totalElements: 0,
    totalPages: 0,
    currentPage: 1,
    hasPrevious: false,
    hasNext: false,
    pages: []
  };
  
  search: any = {
    "teacherName": "",
    "page": 1,
    "size": 2,
    "sortCol": "id",
    "sortType": "ASC"
  }
  
  constructor(private commonRestService:CommonRestService,
    private router:Router,
    private route: ActivatedRoute
  ){}
  ngOnInit(): void {
    this.getAllTeachers();
  }

  getAllTeachers(): void {
    let params = new HttpParams().set("teacherName", this.search.teacherName);
    params = params.append("page", this.search.page);
    params = params.append("size", this.search.size);
    params = params.append("sortCol", this.search.sortCol);
    params = params.append("sortType", this.search.sortType);
    this.commonRestService.getWithParam("/teacher/v1/pagination", params).subscribe(
      (response: any) => {
        this.teachers = response.data;
        this.searchResult.totalElements = response.totalElements;
        this.searchResult.totalPages = response.totalPages;
        this.searchResult.currentPage = response.currentPage;
        this.searchResult.hasPrevious = response.hasPrevious;
        this.searchResult.hasNext = response.hasNext;
        this.searchResult.pages = response.pages;
        // debugger
      }
    );
  }

  nextPage(): void {
    this.goPage(this.search.page+1);
  }

  prevPage(): void {
    this.goPage(this.search.page-1);
  }

  goPage(page: any): void {
    if (typeof page === "string") {
      page = Number(page);
    }
    
    this.search.page = page;
    this.getAllTeachers();
  }
  
  sortByColName(colName: any): void {
    if(this.search.sortCol === colName){
      this.search.sortType = this.search.sortType === "ASC" ? "DESC" : "ASC";
    } else {
      this.search.sortCol = colName;
      this.search.sortType = "ASC";
    }

    this.getAllTeachers();
  }
 
   delete(teacherId: number):void {
     this.commonRestService.delete("/teacher/v1/delete/",teacherId).subscribe((result)=>{
       this.teachers = this.teachers.filter(emp => emp.id !== teacherId);
     }
 
     )
     }
     
    refreshPage(): void {
      // window.location.reload();
    this.search.courseName = '';
    this.search.page = 1;
    this.search.size = 2;
    this.search.sortCol = 'id';
    this.search.sortType = 'DESC';
    this.getAllTeachers();
  }
}


