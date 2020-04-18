import { Component, OnInit } from "@angular/core";
import { getLocaleEraNames } from '@angular/common';
import { Post } from 'src/app/interfaces/post';

@Component({
  selector: "app-news",
  templateUrl: "./news.component.html",
  styleUrls: ["./news.component.css"],
})
export class NewsComponent implements OnInit {
  config: any;
  collection = { count: 10, data: [] };
post: Post;

  ngOnInit() {
    
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


  constructor() {
    let j = 0;
    for (var i = 0; i < this.collection.count; i++) {

      this.collection.data.push(

        this.post={titulo: "Hola"+j, autor: {movil: "11111111",apellidos: "Perez Lopez", nombre: "Jose", email: "aaaaa", login: "1", password: "1"}, texto: "Lorem ipsum dolor sit amet consectetur, adipisicing elit. Placeat odit nulla, accusantium alias in, perferendis fuga incidunt est molestiae accusamus officiis rerum beatae veniam! Id repudiandae consectetur dolores possimus quis!"}
      );
      j++;
    }

    //Create dummy data
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
