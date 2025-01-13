import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule} from '@angular/material/list'
import { MatIconModule } from '@angular/material/icon'
import { MatExpansionModule } from '@angular/material/expansion'
import { MatButtonModule } from '@angular/material/button';

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
export class AppComponent {
  title = 'front';
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
        {
          title : "Aslema",
          link : "/subject",
        }
      ]
    },
  ]
}
