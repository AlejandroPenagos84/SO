import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmptyProcessComponent } from './empty-process.component';

describe('EmptyProcessComponent', () => {
  let component: EmptyProcessComponent;
  let fixture: ComponentFixture<EmptyProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EmptyProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EmptyProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
