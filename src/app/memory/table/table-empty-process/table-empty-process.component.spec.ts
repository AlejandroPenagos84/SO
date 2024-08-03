import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableEmptyProcessComponent } from './table-empty-process.component';

describe('TableEmptyProcessComponent', () => {
  let component: TableEmptyProcessComponent;
  let fixture: ComponentFixture<TableEmptyProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableEmptyProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableEmptyProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
