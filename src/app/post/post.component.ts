import { Component, inject, model, OnInit, signal } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { MatCardModule } from '@angular/material/card'
import {MatDividerModule} from '@angular/material/divider';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { MAT_DIALOG_DATA, MatDialog, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatInputModule } from '@angular/material/input';
import { CreateCommentDto } from '../../lib/types/create-comment.dto';
import {MatGridListModule} from '@angular/material/grid-list'


@Component({
  selector: 'app-post',
  imports: [MatCardModule, MatDividerModule, MatButtonModule, MatListModule,MatIconModule, MatGridListModule, MatFormFieldModule, FormsModule, MatInputModule],
  templateUrl: './post.component.html',
  styleUrl: './post.component.scss'
})
export class PostComponent implements OnInit {
  postId : string = '';
  postDetails : any;
  comments : any[] = [];

  isCommentEdit : boolean = false;
  commentEditIndex : number = 0;
  isPostEdit : boolean = false;

  postContent : string = '';
  commentContent : string = '';

  readonly dialog = inject(MatDialog);
  readonly author = signal('');
  readonly content = signal('');
  openDialog(): void {
    const dialogRef = this.dialog.open(AddCommentDialog, {
      data : { author : this.author(), content : this.content() }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.author.set(result[0]);
        this.content.set(result[1]);
        this.apiService.createComment(this.postId, { author : this.author(), content : this.content()}).subscribe((_) => this.loadPost());
      }
    });
  }

  constructor(private readonly route : ActivatedRoute,readonly apiService : ApiService, private router : Router){}
  ngOnInit(): void {
     this.postId = this.route.snapshot.paramMap.get('postid') || '';
     this.loadPost();
  }
  loadPost() : void {
    this.apiService.getPost(this.postId).subscribe((data : any ) => {this.postDetails = data; this.comments = data.comments});
  }
  deleteComment(commentId : string){
    this.apiService.deleteComment(this.postId, commentId).subscribe((_)=> this.loadPost());
  }
  deletePost(){
    this.apiService.deletePost(this.postId).subscribe((_)=>{
      this.router.navigateByUrl('/subject');
    })
  }
  editPostContent() : void {
    this.isPostEdit = true;
    this.postContent = this.postDetails.content;
  }
  cancelPostEdit() : void {
    this.isPostEdit = false;
    this.postContent = '';
  }
  editCommentContent(index : number) : void {
    if(this.isCommentEdit) return;
    this.isCommentEdit = true;
    this.commentContent = this.comments[index].content;
  }
  cancelCommentEdit(){
    this.isCommentEdit = false;
    this.commentContent = '';
  }
  confirmPostEdit() : void {
    const content = this.postContent.trim();
    this.isPostEdit = false;
    if(!content) return;
    this.apiService.updatePost(this.postId, { content }).subscribe((_) => this.loadPost());
  }
  confirmCommentEdit(index : number) : void {
    const content = this.commentContent.trim();
    this.isCommentEdit=false;
    if(!content) return;
    this.apiService.updateComment(this.postId, this.comments[index]._id, content).subscribe((_) => this.loadPost());
  }
}
@Component({
  templateUrl : "./comment-dialog.component.html",
  selector : "add-subject-dialog",
  imports : [
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
    MatButtonModule,
  ],
})
export class AddCommentDialog {
  readonly dialogRef = inject(MatDialogRef<AddCommentDialog>);
  readonly data = inject<CreateCommentDto>(MAT_DIALOG_DATA);
  readonly author = model(this.data.author);
  readonly content = model(this.data.content);
  onNoClick() : void {
    this.dialogRef.close();
  }
}
