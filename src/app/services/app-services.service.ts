import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable, catchError, map, tap, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AppServicesService {

  constructor(
    private http: HttpClient
  ) { }

  signUp(data: any): Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/auth/signup`, data).pipe(
      map((response: any)=> response),
      catchError(this.handleError)
    )
  }

signIn(data: any): Observable<any>{
  return this.http.post<any>(`${environment.apiUrl}/auth/signin`,data).pipe(
    tap((response: any)=> localStorage.setItem('token',response)),
    catchError(this.handleError)
  )
}

  sendMail(contactForm : any):Observable<any>{
    return this.http.post<any>(`${environment.apiUrl}/message/mail`,contactForm);
  }

  private handleError(error: HttpErrorResponse) {
    // Customize the error handling logic if needed
    return throwError(error);
  }

  isLoggedIn(): boolean {
    const token = localStorage.getItem('token');
    // Optionally, you can add more checks here (e.g., token expiration)
    return !!token;
  }
  
}
