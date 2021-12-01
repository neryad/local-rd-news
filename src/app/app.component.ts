import { Component } from '@angular/core';
import { NewsService } from './shared/Services/news.service';
import { combineLatest } from 'rxjs';
import { map } from 'rxjs/operators';

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
export class AppComponent {
  title = 'local-rd-news';
  selectedDiary = 'listin';

  articlesVm$ = combineLatest([
    this.newsService.getNews('listin'),
    this.newsService.getNews('diarioLibre'),
    this.newsService.getNews('nacional'),
    this.newsService.getNews('nuevoDiario'),
    this.newsService.getNews('remolacha'),
  ]).pipe(
    map(([listin, diarioLibre, nacional, nuevoDiario, remolacha]) => ({
      listin,
      diarioLibre,
      nacional,
      nuevoDiario,
      remolacha,
    }))
  );

  constructor(private newsService: NewsService) {}

  setSelectedDiary(mediaName: AvailableDiaries) {
    this.selectedDiary = mediaName;
  }

  refreshData() {
    this.articlesVm$.subscribe();
  }
}
