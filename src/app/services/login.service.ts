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
}