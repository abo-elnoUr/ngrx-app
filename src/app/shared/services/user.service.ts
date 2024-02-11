import { Injectable } from '@angular/core';
import { delay, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor() { }

  getSkills() {
    return of(['angular', 'typescript', 'git', 'docker']).pipe(
      delay(2000)
    )
  }
}
