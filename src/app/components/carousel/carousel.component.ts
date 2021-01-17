import { Component, OnInit } from '@angular/core';
import Swiper, { Autoplay } from 'swiper';

Swiper.use([Autoplay]);

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.css'],
})
export class CarouselComponent implements OnInit {
  constructor() {}

  ngOnInit(): void {
    const mySwiper = new Swiper('.swiper-container', {
      direction: 'horizontal',
      loop: true,
      autoplay: true,
      speed: 3000,
    });
  }
}
