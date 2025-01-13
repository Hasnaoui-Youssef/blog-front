import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { PostComponent } from './post/post.component';
import { EditingComponent } from './editing/editing.component';
import { WritePostComponent } from './write-post/write-post.component';
import { SubjectPageComponent } from './subject-page/subject-page.component';

export const routes: Routes = [
    { path : '', component : HomeComponent },
    { path : 'subject', component : SubjectPageComponent },
    { path : 'posts/:postid', component : PostComponent},
    { path : 'edit', component : EditingComponent},
    { path : 'write-post', component : WritePostComponent },
    { path : '**', redirectTo : ''}
];
