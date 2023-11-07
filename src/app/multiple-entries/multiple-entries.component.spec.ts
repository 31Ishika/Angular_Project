import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MultipleEntriesComponent } from './multiple-entries.component';

describe('MultipleEntriesComponent', () => {
  let component: MultipleEntriesComponent;
  let fixture: ComponentFixture<MultipleEntriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MultipleEntriesComponent]
    });
    fixture = TestBed.createComponent(MultipleEntriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
