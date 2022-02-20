import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FilterCheckboxItemComponent } from './filter-checkbox-item.component';

describe('FilterCheckboxItemComponent', () => {
  let component: FilterCheckboxItemComponent;
  let fixture: ComponentFixture<FilterCheckboxItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ FilterCheckboxItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(FilterCheckboxItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
