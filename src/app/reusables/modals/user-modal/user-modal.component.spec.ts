import { ModalService } from './../../../../services/modal.service';
import { AdminService } from './../../../../services/admin.service';
import { async, ComponentFixture, TestBed, fakeAsync, tick } from '@angular/core/testing';
import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA, DebugElement } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Observable } from 'rxjs/Observable';

import { UserModalComponent } from './user-modal.component';
import { Team } from '../../../../models/team.model';

describe('UserModalComponent', () => {
  let component: UserModalComponent;
  let fixture: ComponentFixture<UserModalComponent>;
  let modalInfo: any;
  let closeValue: any;
  let buttonEl: DebugElement;
  let adminServiceStub: any;
  let modalServiceStub: any;
  let teamsMock: any;
  let userInfo: any;

  beforeEach(async(() => {
    adminServiceStub = {
      getActiveTeams: jasmine.createSpy('getActiveTeams').and.callFake(() => {
        Promise.resolve();
      })
    };

    modalServiceStub = {
      open(): Observable<any> {
        return Observable.of(true);
      }
    };

    TestBed.configureTestingModule({
      declarations: [ UserModalComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA],
      providers: [
        { provide: ModalService, useValue: modalServiceStub },
        { provide: AdminService, useValue: adminServiceStub }
      ],
      imports: [ FormsModule ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UserModalComponent);
    component = fixture.componentInstance;
    
    modalInfo = { 
      edit: false,
      header: "mock header", 
      conformationYes: "confirm", 
      conformationNo: "cancel" 
    };

    userInfo = {
      firstName: "mockName",
      lastName: "mockLastName",
      publicEmail: "mockEmail",
      id: "mockEmail",
      permission: "admin"
    }

    teamsMock = ["team1"];
    component.modal = modalInfo;
    component.teams = teamsMock;
    spyOn(component, 'ngOnInit');
    component.ngOnInit();
    fixture.detectChanges();
  });
  
  it('should create with a list of available teams when adding a new ueser', () => {
    expect(component).toBeTruthy();
    adminServiceStub.getActiveTeams();
    expect(adminServiceStub.getActiveTeams).toHaveBeenCalled();
    expect(component.teams).toBeTruthy();
    expect(component.user).toBeFalsy();
  })
  
  it('should create with custom modal data to add new users', () => {
    expect(component.modal.header).toBe("mock header");
  });
  
  it('should create with custom modal data and current user data to edit', () => {
    modalInfo.edit = true;
    component.user = userInfo;
    expect(component.user).toBeTruthy();
    expect(component.modal.header).toBe("mock header");
  });

  it('should add or update a users information when submit is clicked', fakeAsync(() => {
    spyOn(component, "onSubmit");
    buttonEl = fixture.debugElement.nativeElement.querySelector('.dashboard__btn--dark').click();
    tick();
    fixture.detectChanges();
    expect(component.onSubmit).toHaveBeenCalled();
  }));

  it('should close when close() is called', fakeAsync(() => {
    spyOn(component, "close");
    buttonEl = fixture.debugElement.nativeElement.querySelector('.dashboard__btn').click();
    tick();
    expect(component.close).toHaveBeenCalled();
    fixture.detectChanges();
    expect(component.closeValue).not.toBeNull();
  }))
});
