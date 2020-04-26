import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MarkerPostComponent } from './marker-post.component';

describe('MarkerPostComponent', () => {
  let component: MarkerPostComponent;
  let fixture: ComponentFixture<MarkerPostComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MarkerPostComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MarkerPostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
