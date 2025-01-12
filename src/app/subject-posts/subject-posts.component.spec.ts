import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectPostsComponent } from './subject-posts.component';

describe('SubjectPostsComponent', () => {
  let component: SubjectPostsComponent;
  let fixture: ComponentFixture<SubjectPostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SubjectPostsComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SubjectPostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
