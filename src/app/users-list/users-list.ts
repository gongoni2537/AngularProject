import { Component, OnInit, EventEmitter, Output, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
import { User } from '../user.model';
import { UserService } from '../user';

@Component({
  selector: 'app-users-list',
  standalone: true,
  templateUrl: './users-list.html',
  styleUrls: ['./users-list.css'],
  imports: [CommonModule]
})
export class UsersListComponent implements OnInit, OnDestroy {
  users: User[] = [];
  private sub?: Subscription;

  @Output() edit = new EventEmitter<User>();

  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.sub = this.userService.users$.subscribe(users => {
      this.users = users;
    });
  }

  ngOnDestroy(): void {
    this.sub?.unsubscribe();
  }

  onEdit(user: User): void {
    this.edit.emit(user);
  }

  onDelete(user: User): void {
    this.userService.delete(user.id);
  }
}
