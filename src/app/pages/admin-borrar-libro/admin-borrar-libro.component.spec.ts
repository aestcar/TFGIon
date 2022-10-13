import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { AdminBorrarLibroComponent } from './admin-borrar-libro.component';

describe('AdminBorrarLibroComponent', () => {
  let component: AdminBorrarLibroComponent;
  let fixture: ComponentFixture<AdminBorrarLibroComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminBorrarLibroComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(AdminBorrarLibroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
