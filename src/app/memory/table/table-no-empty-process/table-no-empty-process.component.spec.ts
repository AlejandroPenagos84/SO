import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TableNoEmptyProcessComponent } from './table-no-empty-process.component';

describe('TableNoEmptyProcessComponent', () => {
  let component: TableNoEmptyProcessComponent;
  let fixture: ComponentFixture<TableNoEmptyProcessComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TableNoEmptyProcessComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TableNoEmptyProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
