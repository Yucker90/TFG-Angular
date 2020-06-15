import { Component, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { Post } from "src/app/interfaces/post";
import { NewsService } from "src/app/servicios/news.service";

@Component({
  selector: "app-newsedit",
  templateUrl: "./newsedit.component.html",
  styleUrls: ["./newsedit.component.css"],
})
export class NewseditComponent implements OnInit {
  constructor(
    private route: ActivatedRoute,
    private postService: NewsService,
    private router: Router
  ) {}

  idPost: string;
  post: Post;

  ngOnInit() {
    // Obtengo el id de la noticia de la URL y la recojo de la base de datos
    this.idPost = this.route.snapshot.paramMap.get("id");
    this.postService.getNew(this.idPost).subscribe(
      (data) => (this.post = data),
      (error) => error
    );
  }

  submit() {
    this.actualizarNew();
  }

  // Enviamos la nueva noticia para actualizarla
  actualizarNew() {
    this.postService.updateNew(this.idPost, this.post).subscribe(
      (data) => data,
      (error) => console.log(error)
    );
    this.router.navigateByUrl("/news");
  }

  submitBtn(submitBtn: HTMLButtonElement) {
    submitBtn.disabled = true;
    this.submit();
    submitBtn.disabled = false;
  }
}
