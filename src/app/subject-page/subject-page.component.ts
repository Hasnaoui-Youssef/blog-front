import { Component, Input, OnInit } from '@angular/core';
import { MatTabChangeEvent, MatTabsModule } from '@angular/material/tabs'
import { ApiService } from '../api.service';
import { SubjectPostsComponent } from '../subject-posts/subject-posts.component';
import { ActivatedRoute, Router } from '@angular/router';
export interface SubjectDetails {
  subject : {
    name : string
    _id : string
  };
  posts : {
    author : string,
    title : string,
    _id : string,
  }[];
}

@Component({
  selector: 'app-subject-page',
  imports: [MatTabsModule, SubjectPostsComponent],
  templateUrl: './subject-page.component.html',
  styleUrl: './subject-page.component.scss'
})
export class SubjectPageComponent implements OnInit {
  data : SubjectDetails[] = [];
  initialPostId : string = '';

  constructor(private readonly apiService : ApiService, private router : Router){}
  @Input()
  set id(paramId : string){
    this.initialPostId = paramId;
    console.log(this.initialPostId);
  }

  ngOnInit(): void {
    this.apiService.getPostsForAllSubjects().subscribe((data : any) => {
      this.data = data;
      console.log(data);
    })
  }

  onTabChange(event : MatTabChangeEvent) : void {
    const index = event.index;
    const subjectName = this.data[index].subject.name;
    this.router.navigate(['/test/', subjectName], {
      replaceUrl : true,
    });
  }

}
