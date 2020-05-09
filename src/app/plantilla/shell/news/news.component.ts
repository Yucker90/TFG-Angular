import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/interfaces/post";
import { NewsService } from "src/app/servicios/news.service";
import * as Cookies from "js-cookie";
import { isNullOrUndefined } from "util";
import { EncryptService } from "src/app/servicios/encrypt.service";

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
})
export class NewsComponent implements OnInit {
  config: any;
  collection: { count: number; data: Post[] } = { count: 5, data: [] };
  post: Post;
  adminPrivileges = false;

  ngOnInit() {
    this.newsService
      .getNews()
      .subscribe((data) => (data = this.collection.data = data));
    if (!isNullOrUndefined(Cookies.get("USER_ACCESS"))) {
      this.adminPrivileges =
        parseInt(this.encrypt.decrypt(Cookies.get("USER_ACCESS"))) == 31;
    }
  }
  public maxSize: number = 7;
  public directionLinks: boolean = true;
  public autoHide: boolean = false;
  public responsive: boolean = true;
  public labels: any = {
    previousLabel: "Anterior",
    nextLabel: "Siguiente",
    screenReaderPaginationLabel: "Pagination",
    screenReaderPageLabel: "page",
    screenReaderCurrentLabel: `You're on page`,
  };

  constructor(
    private newsService: NewsService,
    private encrypt: EncryptService
  ) {
    this.config = {
      itemsPerPage: 3,
      currentPage: 1,
      totalItems: this.collection.count,
    };
  }

  onPageChanged(event) {
    this.config.currentPage = event;
  }

  borrarNews(id: string) {
    this.newsService.deleteNew(id).subscribe(
      (data) => console.log(data),
      (error) => console.log(error)
    );
    window.location.reload();
  }
}
