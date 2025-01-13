import {ChangeDetectionStrategy, Component, OnInit, signal} from '@angular/core';
import { FormsModule } from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ApiService } from '../api.service';

/**
 * @title Expansion panel as accordion
 */
@Component({
  selector: 'app-editing-component',
  templateUrl: 'editing.component.html',
  styleUrl: 'editing.component.scss',
  imports: [
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    FormsModule
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class EditingComponent implements OnInit {
  subjects : { _id : string, name : string}[] = [];
  constructor( private apiService : ApiService ){}
  ngOnInit(): void {
      this.apiService.getSubjects().subscribe((data : any) => this.subjects = data.map((elem : any) => ({ _id : elem._id, name : elem.name })));
  }
}

