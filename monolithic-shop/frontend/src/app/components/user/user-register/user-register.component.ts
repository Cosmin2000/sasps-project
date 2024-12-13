import { Component } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { User } from '../../../models/user';

@Component({
  selector: 'app-user-register',
  templateUrl: './user-register.component.html',
  styleUrls: ['./user-register.component.scss'],
  standalone: false
})
export class UserRegisterComponent {
  user: User = { name: '', email: '', password: '' };

  constructor(private userService: UserService) {}

  registerUser() {
    this.userService.registerUser(this.user).subscribe((response) => {
      console.log('User registered successfully:', response);
      alert('User registered successfully!');
      this.user = { name: '', email: '', password: '' }; // Reset form
    }, (error) => {
      console.error('Error registering user:', error);
      alert('Failed to register user.');
    });
  }
}