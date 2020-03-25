import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompiladorComponent } from './compilador.component';

describe('CompiladorComponent', () => {
  let component: CompiladorComponent;
  let fixture: ComponentFixture<CompiladorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CompiladorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CompiladorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
