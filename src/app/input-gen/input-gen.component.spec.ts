import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputGenComponent } from './input-gen.component';

describe('InputGenComponent', () => {
  let component: InputGenComponent;
  let fixture: ComponentFixture<InputGenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputGenComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InputGenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
