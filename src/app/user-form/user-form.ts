import { Component, Input, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { User } from '../user.model';
import { UserService } from '../user';

@Component({
  selector: 'app-user-form',
  standalone: true,
  templateUrl: './user-form.html',
  styleUrls: ['./user-form.css'],
  imports: [CommonModule, FormsModule]
})
export class UserFormComponent implements OnChanges {

  @Input() userToEdit: User | null = null;
  @Output() saved = new EventEmitter<void>();

  username: string = '';
  email: string = '';
  role: 'admin' | 'user' = 'user';

  constructor(private userService: UserService) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['userToEdit']) {
      if (this.userToEdit) {
        this.username = this.userToEdit.username;
        this.email = this.userToEdit.email;
        this.role = this.userToEdit.role;
      } else {
        this.clearForm();
      }
    }
  }

  onSubmit(): void {
    if (this.userToEdit) {
      const updatedUser: User = {
        ...this.userToEdit,
        username: this.username,
        email: this.email,
        role: this.role
      };
      this.userService.update(updatedUser);
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        username: this.username,
        email: this.email,
        role: this.role
      };
      this.userService.add(newUser);
    }

    this.clearForm();
    this.saved.emit();
  }

  clearForm(): void {
    this.username = '';
    this.email = '';
    this.role = 'user';
  }
}
