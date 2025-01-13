import { Component, Input } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatTableModule } from '@angular/material/table'

export interface PostData{
  _id : string;
  title : string;
  author : string;
}

@Component({
  selector: 'app-subject-posts',
  imports: [RouterLink, MatTableModule],
  templateUrl: './subject-posts.component.html',
  styleUrl: './subject-posts.component.scss'
})
export class SubjectPostsComponent{
  @Input()
  posts : PostData[] = [];
  displayCols : string[] = ['titre', 'auteur'];
}
