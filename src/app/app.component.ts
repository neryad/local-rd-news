import { AfterViewInit, Component } from '@angular/core';
import { NewsService } from './shared/Services/news.service';
import { combineLatest } from 'rxjs';
import { map, tap } from 'rxjs/operators';
import { Articles } from './shared/interface/news.interface';

import { ElementRef } from '@angular/core';
type AvailableDiaries =
  | 'listin'
  | 'diarioLibre'
  | 'nacional'
  | 'nuevoDiario'
  | 'remolacha';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements AfterViewInit {
  title = 'local-rd-news';
  selectedDiary = 'listin';

  articles!: { [key: string]: Articles[] };

  // Creamos un View Model con el observable
  articlesVm$ = combineLatest([
    this.newsService.getNews('listin'),
    this.newsService.getNews('diarioLibre'),
    this.newsService.getNews('nacional'),
    this.newsService.getNews('nuevoDiario'),
    this.newsService.getNews('remolacha'),
  ]).pipe(
    map(([listin, diarioLibre, nacional, nuevoDiario, remolacha]) => ({
      listin,
      diarioLibre, // LO ESTABAS HACIENDO SUPER!
      nacional,
      nuevoDiario,
      remolacha,
    })), // insertamos los articulos...
    tap((data) => (this.articles = data))
  );

  constructor(private newsService: NewsService, private el: ElementRef) {
    this.refreshData(); // Cargamos los articulos al construirse
  }

  setSelectedDiary(mediaName: AvailableDiaries) {
    this.selectedDiary = mediaName;
  }

  refreshData() {
    this.articlesVm$.subscribe(); // Refrescamos cuando sea necesario.
  }

  ngAfterViewInit(): void {
    let hamburger = document.querySelector(
      '.header .nav-bar .nav-list .hamburger'
    );
    let mobile_menu = this.el.nativeElement.querySelector(
      '.header .nav-bar .nav-list ul'
    );

    hamburger!.addEventListener('click', () => {
      hamburger!.classList.toggle('active');
      mobile_menu.classList.toggle('active');
    });
  }
}
