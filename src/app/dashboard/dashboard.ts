import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersListComponent } from '../users-list/users-list';
import { UserFormComponent } from '../user-form/user-form';
import { User } from '../user.model';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  templateUrl: './dashboard.html',
  styleUrls: ['./dashboard.css'],
  imports: [CommonModule, UsersListComponent, UserFormComponent]
})
export class DashboardComponent {
  selectedUser: User | null = null;

  onEditUser(user: User) {
    this.selectedUser = user;
  }

  onUserSaved() {
    this.selectedUser = null;
  }
}
