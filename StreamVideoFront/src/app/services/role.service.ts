import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RoleService {
  private roleNameSubject: BehaviorSubject<string | null> = new BehaviorSubject<string | null>(null);

  setRoleName(role: string) {
    this.roleNameSubject.next(role);
  }

  getRoleName(): Observable<string | null> {
    return this.roleNameSubject.asObservable();
  }
}
