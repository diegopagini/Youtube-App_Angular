import { AfterViewInit, Component, OnInit } from '@angular/core';
import { Video } from 'src/app/models/youtube.models';
import { YoutubeService } from '../../services/youtube.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

declare var M;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, AfterViewInit {
  videos: Video[] = [];
  constructor(private youtubeService: YoutubeService, private router: Router) {}

  ngOnInit(): void {
    this.loadVideos();
  }

  ngAfterViewInit() {
    document.addEventListener('DOMContentLoaded', function () {
      const elems = document.querySelectorAll('.fixed-action-btn');
      const instances = M.FloatingActionButton.init(elems, {
        direction: 'right',
      });
    });
  }

  loadVideos() {
    this.youtubeService.getVideos().subscribe((resp) => {
      this.videos.push(...resp);
    });
  }

  showVideo(video: Video) {
    Swal.fire({
      html: `
      <h4>${video.title}</h4>
      <hr>
      <iframe 
        width="100%" 
        height="315" 
        src="https://www.youtube.com/embed/${video.resourceId.videoId}" 
        frameborder="0" 
        allow="accelerometer; 
        autoplay; 
        clipboard-write; 
        encrypted-media; 
        gyroscope; 
        picture-in-picture" 
        allowfullscreen>
      </iframe>
      `,
    });
  }

  navigateToBook() {
    window.location.href =
      'https://www.amazon.com/-/es/Alan-Buscaglia/dp/B08GRKFSD9';
  }
}
