import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

interface MovieInfo{
  id: number;
  name: string;
  opening_crawl: string;
  release_date: string;
  characters: string[];
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public movieId:number;

  public movieInfo: MovieInfo;

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.movieId = +this.route.snapshot.paramMap.get('movieId');
   }

  ngOnInit(): void {
    this.http.get(`https://swapi.py4e.com/api/films/${this.movieId}`).subscribe((movie: MovieInfo) => {
      this.movieInfo = movie;
    });
  }

}
