import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router'; // <-- Add RouterLinkActive here
import { CartService } from '../../services/cart';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [RouterLink, RouterLinkActive], // <-- Add it here as well
  templateUrl: './navbar.html',
  styleUrl: './navbar.css'
})
export class Navbar {
  constructor(
    public cartService: CartService
  ) {}
}