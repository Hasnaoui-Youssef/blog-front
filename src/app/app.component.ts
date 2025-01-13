import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatSidenavModule } from '@angular/material/sidenav'
import { MatListModule} from '@angular/material/list'

@Component({
  selector: 'app-root',
  imports: [RouterOutlet,RouterLink,RouterLinkActive, MatSidenavModule, MatListModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'front';
}
