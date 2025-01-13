import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';
import { ActivatedRoute, RouterLink, RouterLinkActive } from '@angular/router';
import { MatTableModule } from '@angular/material/table'

export interface PostData{
  id : string;
  title : string;
  author : string;
}

@Component({
  selector: 'app-subject-posts',
  imports: [RouterLink, MatTableModule],
  templateUrl: './subject-posts.component.html',
  styleUrl: './subject-posts.component.scss'
})
export class SubjectPostsComponent implements OnInit {
  posts : PostData[] = [];
  displayCols : string[] = ['titre', 'auteur'];
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
