import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaginationTaskComponent } from './pagination-task.component';

describe('PaginationTaskComponent', () => {
  let component: PaginationTaskComponent;
  let fixture: ComponentFixture<PaginationTaskComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PaginationTaskComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PaginationTaskComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
