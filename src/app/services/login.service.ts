import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { URL_AUTH_BASE} from 'src/utils/app.constants';


@Injectable({ providedIn: 'root' })
export class LoginService {
    
    constructor(
        private router: Router,
        private http: HttpClient
    ) {
    }

    login(user: any) : Observable<any> {
            // var oJSON = JSON.stringify(user);
            let items$ = this.http
                .post(URL_AUTH_BASE, user);
                // (items$);
            return items$;            
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('user');
       // this.userSubject.next(null);
        this.router.navigate(['/login']);
    }

    public ValidarDNI(dni:string): Observable<any> {
        let data=[{"dni":dni}]
        let apiUrl = "https://www.softwarelion.xyz/api/reniec/reniec-dni"
        let auth_token="eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjo4NDQsImNvcnJlbyI6ImthdHlhdmVyZ2FyYXkud0BnbWFpbC5jb20iLCJpYXQiOjE2NTc1OTYyMDB9.RPv4Dd8a-z0KEfnhf1A1OB-fJjnhxRD5uWE0JZf8_Mw"
        
        // let apiUrl = "https://apiperu.dev/api/dni/"
        // let auth_token="9221fc5c2a3f46d2428607e2b42f8c9214170c28a22662c718330ade3330a04a"
  
        const headers = {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${auth_token}`
        }
        return this.http.post(apiUrl,data[0],{ headers: headers })
        // return this.http.get(apiUrl+`${dni}`, { headers: headers })
      } 
}