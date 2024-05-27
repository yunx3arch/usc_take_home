import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let httpMock: HttpTestingController;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HttpClientTestingModule, RouterTestingModule]
    }).compileComponents();

    httpMock = TestBed.inject(HttpTestingController);
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });
  
  beforeEach(() => {
    localStorage.clear();
  });


  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should fetch dashboard data', () => {
    spyOn(component, 'getDashboardData').and.callThrough();

    component.ngOnInit();
    expect(component.getDashboardData).toHaveBeenCalled();
    
  });

  it('should handle successful dashboard data retrieval', () => {
    const authToken = 'dummyToken';
    localStorage.setItem('authToken', authToken);
    const responseData = { exampleData: 'exampleValue' };

    component.getDashboardData();

    const req = httpMock.expectOne('http://localhost:5001/api/protected/dashboard');
    expect(req.request.method).toBe('GET');
    expect(req.request.headers.get('Authorization')).toBe(`Bearer ${authToken}`);

    req.flush(responseData);

    expect(component.dashboardData).toEqual(responseData);
  });

});
