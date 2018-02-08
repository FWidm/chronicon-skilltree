import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChroniconSkillComponent } from './chronicon-skill.component';

describe('ChroniconSkillComponent', () => {
  let component: ChroniconSkillComponent;
  let fixture: ComponentFixture<ChroniconSkillComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChroniconSkillComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChroniconSkillComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
