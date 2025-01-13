import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { createPostDto } from '../lib/types/create-post.dto';
import { CreateCommentDto } from '../lib/types/create-comment.dto';
import { UpdatePostDto } from '../lib/types/update-post.dto';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = "http://localhost:3000";

  constructor(private http : HttpClient) { }

  getSubjects() {
    return this.http.get(`${this.baseUrl}/subject`);
  }
  getPostsForAllSubjects() {
    return this.http.get(`${this.baseUrl}/post/by-name`);
  }

  getPostsForSubject(name : string){
    const subject = name.trim();
    return this.http.get(`${this.baseUrl}/subject/${subject}/posts`);
  }

  createSubject(name : string){
    const trimmed = name.trim();
    return this.http.post(`${this.baseUrl}/subject/${trimmed}`, {});
  }

  renameSubject(name : string, newName : string){
    const oldTrimmed = name.trim();
    const newTrimmed = newName.trim();
    if(newTrimmed.length === 0){
      return;
    }
    const options = {
      params : new HttpParams().set('new-name', newTrimmed)
    }
    return this.http.patch(`${this.baseUrl}/subject/${oldTrimmed}`,{}, options);
  }
  deleteSubject(name : string){
    const trimmed = name.trim();
    return this.http.delete(`${this.baseUrl}/subject/${trimmed}`);
  }

  createPost( postDto : createPostDto){
    return this.http.post(`${this.baseUrl}/post`, postDto);
  }
  createComment (postId : string,  commentDto : CreateCommentDto){
    return this.http.post(`${this.baseUrl}/post/${postId}`, commentDto);
  }
  updateComment( postId : string, commentId : string, content : string){
    return this.http.patch(`${this.baseUrl}/post/comment/${postId}`, {content}, {
      params : new HttpParams().set('comment', commentId)
    });
  }
  updatePost (postId : string, postDto : UpdatePostDto){
    return this.http.patch(`${this.baseUrl}/post/${postId}`, postDto);
  }
  deleteComment( postId : string, commentId : string){
    return this.http.delete(`${this.baseUrl}/post/comment/${postId}`, {
      params : new HttpParams().set('comment', commentId)
    });
  }
  deletePost( postId : string){
    return this.http.delete(`${this.baseUrl}/post/${postId}`);
  }
  getPost( postId : string ){
    return this.http.get(`${this.baseUrl}/post/${postId}`);
  }
}
