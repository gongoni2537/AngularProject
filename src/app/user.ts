import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private readonly STORAGE_KEY = 'users';
  private users: User[] = [];

  // Publisher – ישדר לכל מי שעושה subscribe את רשימת המשתמשים
  private usersSubject = new BehaviorSubject<User[]>([]);
  users$ = this.usersSubject.asObservable();

  constructor() {
    this.loadFromStorage();
  }

  private loadFromStorage(): void {
    const data = localStorage.getItem(this.STORAGE_KEY);
    this.users = data ? JSON.parse(data) : [];
    this.usersSubject.next(this.users);
  }

  private saveToStorage(): void {
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.users));
    this.usersSubject.next(this.users); // משדרים שינוי
  }

  getAll(): User[] {
    return this.users;
  }

  add(user: User): void {
    this.users.push(user);
    this.saveToStorage();
  }

  update(user: User): void {
    const index = this.users.findIndex(u => u.id === user.id);
    if (index !== -1) {
      this.users[index] = user;
      this.saveToStorage();
    }
  }

  delete(id: string): void {
    this.users = this.users.filter(u => u.id !== id);
    this.saveToStorage();
  }
}
