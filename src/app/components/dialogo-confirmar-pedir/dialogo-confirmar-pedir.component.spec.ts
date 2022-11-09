import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { DialogoConfirmarPedirComponent } from './dialogo-confirmar-pedir.component';

describe('DialogoConfirmarPedirComponent', () => {
  let component: DialogoConfirmarPedirComponent;
  let fixture: ComponentFixture<DialogoConfirmarPedirComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ DialogoConfirmarPedirComponent ],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(DialogoConfirmarPedirComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
