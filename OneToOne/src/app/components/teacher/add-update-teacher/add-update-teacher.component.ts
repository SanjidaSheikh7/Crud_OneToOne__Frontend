import { Component,OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Course } from 'src/app/models/course';
import { CommonRestService } from 'src/app/services/common-rest.service';

@Component({
  selector: 'app-add-update-teacher',
  templateUrl: './add-update-teacher.component.html',
  styleUrls: ['./add-update-teacher.component.css']
})
export class AddUpdateTeacherComponent implements OnInit {
  title:'teacherForm';
  courseList:Course[]=[];
  teacherForm:FormGroup;
  isUpdate:boolean;
  teacherId:number;
  isView:boolean;
  constructor(private commonRestService:CommonRestService,
              private router:Router,
              private route:ActivatedRoute
  ){}
  ngOnInit():void{
    this.teacherForm=new  FormGroup({
       id:new FormControl(null,Validators.required),
       name:new FormControl(null,Validators.required),
       email:new FormControl(null,[Validators.required,Validators.email]),
       phoneNo:new FormControl(null,Validators.required),
       address:new FormControl(null,Validators.required),
       courseId:new FormControl(null,Validators.required)
    });
    this.getAllCourses();
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.teacherId = params['id'];
        this.isUpdate = true;
        this.commonRestService.getById(this.teacherId,"/teacher/v1/find/").subscribe(teacherResponse => {
          this.teacherForm.patchValue({
            name:teacherResponse.name,
            email:teacherResponse.email,
            phoneNo:teacherResponse.phoneNo,
            address:teacherResponse.address,
            courseId:teacherResponse.courseId
          });
        });
      }
    });

    this.route.queryParams.subscribe(params => {
      console.log('Query Params:', params);
      // debugger
      if (params['isUpdate']) {
        this.isUpdate = true;
        console.log(this.isUpdate);
      }
  
      if (params['isView']) {
        this.isView = true; 
        Object.keys(this.teacherForm.controls).forEach(controlName => {
          this.teacherForm.get(controlName)?.disable();
        });
      }
    });
  }
  
  public getAllCourses():void{
    this.commonRestService.get("/course/v1/all").subscribe(
     (response:Course[])=>{
       this.courseList=response;
     }
    )
   }

   onSubmitTeacher(){
    this.commonRestService.onSubmit(this.teacherForm, this.teacherId, this.isUpdate,"/teacher").subscribe(result => {
      console.warn(result);
      this.router.navigate(['/teacher']).then(() => {
        this.teacherForm.reset();
      });
    });
   }
 
  onCourseSelectionChange(event: Event): void {
    const selectedValue = (event.target as HTMLSelectElement).value;
    this.teacherForm.patchValue({
      courseId: selectedValue
    });
}
  getSubmitButtonText() {
  return this.isView ? 'View' : (this.isUpdate ? 'Update' : 'Add')
  }
}
