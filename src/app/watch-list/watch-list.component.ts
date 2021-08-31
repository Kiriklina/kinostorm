import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { convertNumberToRoman } from'src/functions/convert-to-roman';
import { generateRandomDate } from'src/functions/random-date';

interface MovieListItem{
  id: number;
  name: string;
  date: Date;
  watched: boolean;
  checked: boolean;
  url: number;
}

interface MovieListFromServer {
  count: number;
  previous: any;
  next: any;
  results: [];
}

interface MovieFromServer {
  title: string;
  episode_id: number;
  opening_crawl: string;
  director: string;
  producer: string;
  release_date: string;
  characters: string[];
  planets: string[];
  starships: string[];
  vehicles: string[];
  species: string[];
  created: string;
  edited: string;
  url: string;
}


@Component({
  selector: 'app-watch-list',
  templateUrl: './watch-list.component.html',
  styleUrls: ['./watch-list.component.scss']
})
export class WatchListComponent implements OnInit {
  public movieList: MovieListItem[];

  public menuList = [
    {
      id: 1,
      name: "Все фильмы",
    },
    {
      id: 2,
      name: "Просмотренные",
    },
    {
      id: 3,
      name: "Непросмотренные",
    },
  ];

  public currentMovieOption: number = 1;

  private from = new Date(1999, 7, 29, 2, 3, 4, 567);
  private to = new Date(2017, 12, 14, 5, 1, 0, 500);

  public get displayDeleteBtn(): boolean{
    return !!this.movieList?.find(movie => movie.checked);
  }

  public get currentMovieList(): MovieListItem[]{
    return this.currentMovieOption===1
      ? this.movieList
      : this.currentMovieOption===2
        ? this.movieList.filter(movie => movie.watched)
        : this.movieList.filter(movie => !movie.watched);
  }


  constructor(private http: HttpClient) {}

  public ngOnInit(): void {
    this.getMovies();
  }

  public switchMovieOption(value: number): void{
    this.currentMovieOption = value;
  }

  public switchWatched(value: MovieListItem): void{
    value.watched= !value.watched;
  }

  public deleteSelected(): void{
    this.movieList = this.movieList.filter(movie => !movie.checked);
  }

  private getMovies(): void {
    this.http.get('https://swapi.py4e.com/api/films').subscribe((movies: MovieListFromServer) => {
      this.movieList = movies.results.map((item: MovieFromServer) => {
        return {
          id: item.episode_id,
          name: 'Star Wars. Episode ' + convertNumberToRoman(item.episode_id) + '. ' + item.title,
          date: generateRandomDate(this.from, this.to),
          watched: false,
          checked: false,
          url: +item.url.split('/')[item.url.split('/').length - 2],
        };
      });
    });
  }
}
