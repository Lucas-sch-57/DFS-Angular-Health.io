import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditAlimentComponent } from './edit-aliment.component';

describe('EditAlimentComponent', () => {
  let component: EditAlimentComponent;
  let fixture: ComponentFixture<EditAlimentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EditAlimentComponent]
    });
    fixture = TestBed.createComponent(EditAlimentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
