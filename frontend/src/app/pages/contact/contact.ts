import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [FormsModule],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  name = '';
  email = '';
  message = '';

  sendMessage() {

    alert('Message Sent Successfully!');

    this.name = '';
    this.email = '';
    this.message = '';

  }

}