import { Component, inject, model, OnInit, signal} from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { ApiService } from '../api.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatInputModule} from '@angular/material/input'
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button'

export interface DialogData{
  subjectName : string;
}

@Component({
  selector: 'app-home',
  imports: [ MatButtonModule, RouterLink],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  constructor( private apiService : ApiService ){}
  subjects : any[] = [];
  readonly dialog = inject(MatDialog)
  readonly subjectName = signal('');
  openDialog(): void {
    const dialogRef = this.dialog.open(AddSubjectDialog, {
      data : { subjectName : this.subjectName() }
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
      if (result !== undefined) {
        this.subjectName.set(result);
        this.apiService.createSubject(this.subjectName()).subscribe((subject) => this.subjects.push(subject));
      }
    });
  }
  ngOnInit(): void {
    this.loadSubjects();
  }
  loadSubjects(){
    this.apiService.getSubjects().subscribe( (subjects : any) => this.subjects = subjects)
  }
}

@Component({
  templateUrl : "./subjectDialog.component.html",
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
export class AddSubjectDialog {
  readonly dialogRef = inject(MatDialogRef<AddSubjectDialog>);
  readonly data = inject<DialogData>(MAT_DIALOG_DATA);
  readonly subjectName = model(this.data.subjectName);
  onNoClick() : void {
    this.dialogRef.close();
  }
}