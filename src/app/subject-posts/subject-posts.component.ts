import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-subject-posts',
  imports: [RouterLink],
  templateUrl: './subject-posts.component.html',
  styleUrl: './subject-posts.component.css'
})
export class SubjectPostsComponent implements OnInit {
  posts : any[] = [];
  subjectName : string = '';
  constructor( readonly apiService : ApiService, private readonly route : ActivatedRoute){}
  ngOnInit(): void {
     this.subjectName = this.route.snapshot.paramMap.get('subjectid') || "";
     this.loadPosts();
  }
  loadPosts(){
    this.apiService.getPostsForSubject(this.subjectName).subscribe((data : any) => this.posts = data.posts);
  }
}
