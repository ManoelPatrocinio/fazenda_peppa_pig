import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EdicaoSuinoComponent } from './edicao-suino.component';

describe('EdicaoSuinoComponent', () => {
  let component: EdicaoSuinoComponent;
  let fixture: ComponentFixture<EdicaoSuinoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EdicaoSuinoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EdicaoSuinoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
