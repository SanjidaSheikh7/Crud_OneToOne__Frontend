import { HttpParams } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Course } from 'src/app/models/course';
import { SearchResult } from 'src/app/models/search-result';
import { CommonRestService } from 'src/app/services/common-rest.service';

@Component({
  selector: 'app-show-course-info',
  templateUrl: './show-course-info.component.html',
  styleUrls: ['./show-course-info.component.css']
})
export class ShowCourseInfoComponent implements OnInit{

  courses:Course[];

  searchResult: SearchResult = {
    totalElements: 0,
    totalPages: 0,
    currentPage: 1,
    hasPrevious: false,
    hasNext: false,
    pages: []
  };

  search: any = {
    courseName: "",
    page: 1,
    size: 2,
    sortCol: "id",
    sortType: "ASC",
  }

  
  constructor(private commonRestService:CommonRestService
  ){}

  ngOnInit():void{

    this.getAllCourses();

  }

  getAllCourses(): void {
    let params = new HttpParams().set("courseName", this.search.courseName);
    params = params.append("page", this.search.page);
    params = params.append("size", this.search.size);
    params = params.append("sortCol", this.search.sortCol);
    params = params.append("sortType", this.search.sortType);
    this.commonRestService.getWithParam("/course/v1/pagination", params).subscribe(
      (response: any) => {
        this.courses = response.data;
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
    this.getAllCourses();
  }
  
  sortByColName(colName: any): void {
    if(this.search.sortCol === colName){
      this.search.sortType = this.search.sortType === "ASC" ? "DESC" : "ASC";
    } else {
      this.search.sortCol = colName;
      this.search.sortType = "ASC";
    }

    this.getAllCourses();
  }

  deleteCourse(courseId: number):void {
    this.commonRestService.delete("/course/v1/delete/",courseId).subscribe((result)=>{
      this.courses = this.courses.filter(emp => emp.id !== courseId);
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

    this.getAllCourses();
}
}
