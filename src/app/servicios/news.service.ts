import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Post } from '../interfaces/post';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NewsService {

  private newsURl = 'http://localhost:8082/api/v1/news';

  constructor(private http: HttpClient) { }

  enviarNews(post: Post){
    console.log("Servicio");
    return this.http.post(`${this.newsURl}`, post);
  }

  getNews(): Observable<any>{
    return this.http.get<Post[]>(`${this.newsURl}`);
  }

  deleteNew(id: string) {
    return this.http.delete(`${this.newsURl}/${id}`);
  }

  updateNew(id: string, post: Post){
    return this.http.put(`${this.newsURl}/${id}`, post);
  }

  getNew(idPost: string):Observable<any> {
    return this.http.get(`${this.newsURl}/${idPost}`);
  }

}
