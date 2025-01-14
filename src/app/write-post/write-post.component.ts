import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatSelectModule} from '@angular/material/select';
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ApiService } from '../api.service';
import { createPostDto } from '../../lib/types/create-post.dto';
import { Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { MatDividerModule } from '@angular/material/divider';

@Component({
  selector: 'app-write-post',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, MatButtonModule, MatCardModule, FormsModule, MatDividerModule],
  templateUrl: './write-post.component.html',
  styleUrl: './write-post.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WritePostComponent implements OnInit {
  author : string = '';
  title : string = '';
  subject : string = '';
  content : string = '';
  subjects : { _id : string, name : string}[] = [];
  constructor( private apiService : ApiService, private router : Router ) {}
  ngOnInit(): void {
    this.fetchSubjects();
  }
  fetchSubjects(){
      this.apiService.getSubjects().subscribe((data : any) => this.subjects = data.map((elem : any) => ({ _id : elem._id, name : elem.name })));
  }
  createPost(){
    if( this.author.trim().length === 0
      || this.title.trim().length === 0
      || this.subject.length === 0
      || this.content.trim().length === 0){
        return;
    }
    const postDto : createPostDto = {
        title : this.title.trim(),
        author : this.author.trim(),
        subject : this.subject,
        content : this.content.trim(),
    };
    this.apiService.createPost(postDto).subscribe(()=> {
      this.router.navigateByUrl('/subject');
    })
  }

}
