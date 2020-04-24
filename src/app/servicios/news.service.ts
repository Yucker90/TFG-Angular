import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsURl = 'http://localhost:8080/api/v1/news';

  constructor(private http: HttpClient) { }

  enviarNews(post: Post){
    console.log("Servicio");
    return this.http.post(`${this.newsURl}`, post).subscribe(data => console.log(data));
  }

  getNews(): Observable<any>{
    return this.http.get(`${this.newsURl}`);
  }
}
