import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { convertNumberToRoman } from'src/functions/convert-to-roman';

interface MovieInfo{
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

interface CharacterInfo{
  name: string;
  height: string;
  mass: string;
  hair_color: string;
  skin_color: string;
  eye_color: string;
  birth_year: string;
  gender: string;
  homeworld: string;
  films: string[];
  species: string[];
  vehicles: string[];
  starships: string[];
  created: string;
  edited: string;
  url: string;
}

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.component.html',
  styleUrls: ['./catalog.component.scss']
})
export class CatalogComponent implements OnInit {
  public movieId: number;
  public movieInfo: MovieInfo;
  public episodeRoman: string;
  public releaseDate: string;
  public bannerList = ["darth-wader", "leia-organa", "rebel", "merlin", "fake-leia", "padme", "aaa", "aaa-bass", "why-him"];
  public randomBanner: string;
  public characterInfo: CharacterInfo[];
  public avatarList = ["obi-wankenobi","yoda", "lukeskywalker", "leiaorgana", "jabbadesilijictiure", "hansolo", "darthvader", "chewbacca", "c-3po", "anakinskywalker"];

  constructor(private route: ActivatedRoute, private http: HttpClient) {
    this.movieId = +this.route.snapshot.paramMap.get('movieId')|| 1;
   }

  ngOnInit(): void {
    this.http.get(`https://swapi.py4e.com/api/films/${this.movieId}`).subscribe((movie: MovieInfo) => {
      this.movieInfo = movie;
      this.releaseDate = this.movieInfo.release_date.split('-')[0];
      this.episodeRoman = convertNumberToRoman(this.movieInfo.episode_id);
      this.randomBanner = 'url(../../assets/images/' + this.bannerList[Math.round(Math.random() * (this.bannerList.length - 1))] + '.jpg)';

      forkJoin(movie.characters.slice(0, 6).map( url =>  this.http.get(url))).subscribe((characters: CharacterInfo[]) => {
        this.characterInfo = characters;
      });
    });
  }

}
