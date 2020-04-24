import { Component, OnInit } from "@angular/core";
import { getLocaleEraNames } from '@angular/common';
import { Post } from 'src/app/interfaces/post';
import { NewsService } from 'src/app/servicios/news.service';
import { Observable } from 'rxjs';

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
})
export class NewsComponent implements OnInit {
  config: any;
  collection = { count: 10, data: new Observable<Post[]>() };
post: Post;

  ngOnInit() {
    this.collection.data= this.newsService.getNews();
    
  }
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
      previousLabel: 'Anterior',
      nextLabel: 'Siguiente',
      screenReaderPaginationLabel: 'Pagination',
      screenReaderPageLabel: 'page',
      screenReaderCurrentLabel: `You're on page`};


  constructor(private newsService: NewsService) {

    this.config = {
      itemsPerPage: 3,
      currentPage: 1,
      totalItems: this.collection.count,
    };
  }

  onPageChanged(event) {
    this.config.currentPage = event;
  }
}
