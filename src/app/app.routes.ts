import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { SubjectPostsComponent } from './subject-posts/subject-posts.component';
import { PostComponent } from './post/post.component';
import { EditingComponent } from './editing/editing.component';

export const routes: Routes = [
    { path : '', component : HomeComponent },
    { path : 'posts/:postid', component : PostComponent},
    { path : 'subject/:subjectid', component : SubjectPostsComponent },
    { path : 'edit', component : EditingComponent},
    { path : '**', redirectTo : ''}
];
