import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InputListItem } from './input-list-item';

describe('InputListItem', () => {
  let component: InputListItem;
  let fixture: ComponentFixture<InputListItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [InputListItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(InputListItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
