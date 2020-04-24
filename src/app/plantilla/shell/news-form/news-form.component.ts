import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/interfaces/post";
import { NewsService } from "src/app/servicios/news.service";
import * as Cookies from "js-cookie";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Router } from '@angular/router';

@Component({
  selector: "app-news-form",
  templateUrl: "./news-form.component.html",
  styleUrls: ["./news-form.component.css"],
})
export class NewsFormComponent implements OnInit {
  post: Post = new Post();
  submitted = false;

  constructor(
    private newsService: NewsService,
    private usuarioService: UsuarioService,
    private router: Router
  ) {}

  ngOnInit() {
    this.post.texto = "";
  }

  submit() {
    console.log("submit");
    this.crearPost();
    this.submitted = true;
  }

  submitBtn(submitBtn: HTMLButtonElement) {
    console.log("submitBtn");

    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }

  /*
 submit(submitBtn: HTMLButtonElement) {
  console.log("submit");
  this.crearPost();
  this.submitted = true;
  console.log("submitBtn");
  submitBtn.disabled = true;
  submitBtn.disabled = false;
}

 */
  crearPost() {
    console.log("crearPost");

    let usuarioid = Cookies.get("USER_ID");
    this.usuarioService.getUsuario(usuarioid).subscribe((data) => {
      this.post.autor = data;
      this.newsService.enviarNews(this.post);
    });
    this.router.navigateByUrl("/news");
  }
}
