import { Component, OnInit } from "@angular/core";
import { Post } from "src/app/interfaces/post";
import { NewsService } from "src/app/servicios/news.service";
import * as Cookies from "js-cookie";
import { UsuarioService } from "src/app/servicios/usuario.service";
import { Router } from "@angular/router";
import { EncryptService } from "src/app/servicios/encrypt.service";
import { Location } from "@angular/common";

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
    private router: Router,
    private encrypt: EncryptService,
    private location: Location
  ) {}

  ngOnInit() {
    this.post.texto = "";
  }

  submit() {
    this.crearPost();
    this.submitted = true;
  }

  submitBtn(submitBtn: HTMLButtonElement) {

    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }

  crearPost() {

    let usuarioid = parseInt(this.encrypt.decrypt(Cookies.get("USER_ID")));
    this.usuarioService.getUsuario(usuarioid.toString()).subscribe((data) => {
      this.post.autor = data;
      console.log(this.post);
      this.newsService.enviarNews(this.post).subscribe(
        (data) => data,
        (error) => console.log(error)
      );
    });
    this.router.navigateByUrl("/");
  }

  volver() {
    this.location.back();
  }
}
