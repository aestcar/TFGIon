import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DialogoConfirmarReservaComponent } from './dialogo-confirmar-reserva.component';

describe('DialogoConfirmarReservaComponent', () => {
  let component: DialogoConfirmarReservaComponent;
  let fixture: ComponentFixture<DialogoConfirmarReservaComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoConfirmarReservaComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogoConfirmarReservaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
