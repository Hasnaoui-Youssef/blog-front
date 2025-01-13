import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ApiService } from '../api.service';
import { MatCardModule } from '@angular/material/card'
import {MatDividerModule} from '@angular/material/divider';

@Component({
  selector: 'app-post',
  imports: [MatCardModule, MatDividerModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  postId : string = '';
  postDetails : any;
  comments : any[] = [];
  constructor(private readonly route : ActivatedRoute,readonly apiService : ApiService){}
  ngOnInit(): void {
     this.postId = this.route.snapshot.paramMap.get('postid') || '';
     this.loadPost();
  }
  loadPost() : void {
    this.apiService.getPost(this.postId).subscribe((data : any ) => {this.postDetails = data; this.comments = data.comments});
  }
}
