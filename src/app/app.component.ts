import { Component, OnInit } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule} from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatButtonModule } from '@angular/material/button';
import { ApiService } from './api.service';

interface SideNavElement {
  title : string;
  link? : string;
  icon? : string;
  children? : SideNavElement[];
}

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterLinkActive, MatSidenavModule, MatListModule, MatIconModule, MatExpansionModule, MatButtonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent implements OnInit {
  title = 'front';
  subjectWithLinks : SideNavElement[] = [];
  constructor(private readonly apiService : ApiService){}
  ngOnInit(): void {
     this.apiService.getSubjects().subscribe((data : any) =>{
        this.subjectWithLinks = data.map((elem : any) => ({ title : elem.name, link : '/subject'}));
        this.sideNavComponent[3].children = this.subjectWithLinks;
     });
  }
  sideNavComponent : SideNavElement[] = [
    {
      title : "Accueil",
      icon : "home",
      link : "/",
    },
    {
      title : "Editer les sujets",
      icon : "edit",
      link : "/edit",
    },
    {
      title : "Ajouter un blog",
      icon : "add",
      link : "/write-post",
    },
    {
      title : "Sujets",
      icon : "category",
      children : [
      ]
    },
  ]
}
