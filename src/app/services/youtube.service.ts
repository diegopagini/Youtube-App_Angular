import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { YoutubeResponse } from './../models/youtube.models';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class YoutubeService {
  private youtubeUrl = 'https://www.googleapis.com/youtube/v3';
  private apiKey = 'AIzaSyDuWH9T19U1gP_5Tsuw6IOe2ho5eN5oIEc';
  private playList = 'UUbx_d228PdYwgB4Jz202SIQ';
  private nexPageToken = '';

  constructor(private http: HttpClient) {}

  getVideos() {
    const url = `${this.youtubeUrl}/playlistItems`;
    const params = new HttpParams()
      .set('part', 'snippet')
      .set('maxResults', '10')
      .set('playlistId', this.playList)
      .set('key', this.apiKey)
      .set('pageToken', this.nexPageToken);

    return this.http
      .get<YoutubeResponse>(url, { params })
      .pipe(
        map((resp) => {
          this.nexPageToken = resp.nextPageToken;
          return resp.items;
        }),
        map((items) => {
          return items.map((video) => video.snippet);
        })
      );
  }
}
