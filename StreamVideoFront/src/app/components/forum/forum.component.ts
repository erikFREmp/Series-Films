import { Component, OnInit, HostListener } from '@angular/core';
import { PostService } from '../../services/post.service';
import { AuthService } from '../../services/auth.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../class/post';
import { PurchaseService } from '../../services/purchase.service'; // eliminar después de tener GET method, solo prueba
import { Subscription } from 'rxjs';
import { Content } from '../../class/content';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-forum',
  templateUrl: './forum.component.html',
  styleUrls: ['./forum.component.css']
})
export class ForumComponent implements OnInit {
  productId: number;
  isFilm: boolean;
  token: string;
  postDate: string;
  Products: Content[] = [];
  visibleProducts: Content[] = [];
  itemsToLoad: number = 1;
  newContent: string = '';
  isAdmin = false;
  roleName: string | null = null;
  isLoggedIn: boolean = false;

  private roleSubscription: Subscription = new Subscription();

  constructor(
    private purchaseService: PurchaseService, // eliminar después de tener GET method, solo prueba
    private route: ActivatedRoute,
    private authService: AuthService,
    private postService: PostService
  ) { }

  @HostListener('document:keydown.enter', ['$event'])
  handleEnterKey(event: KeyboardEvent): void {
    this.createPost(this.newContent);
  }

  ngOnInit(): void {
    const url = this.route.snapshot.url.join('/');
    this.isFilm = url.includes('movie'); // averigua si URL contiene palabra movie, si contiene es true sino false

    this.token = this.authService.getToken();
    console.log("Token: " + this.token);

    this.productId = +this.route.snapshot.paramMap.get('id');

    this.readPost();
    
    this.roleSubscription = this.authService.getCurrentUser().subscribe(role => {
      this.roleName = role;
      this.isAdmin = role === 'ADMIN';

    });
    //solicitar cada 5s al servidor para no refrescar los resultados MANUALMENTE
    //DESVENTAJA: ineficiente, consumen más recursos. ALTERNATIVA: SSE service, unidireccional de servidor a cliente (falta por implementar)
    //interval(1000).subscribe(() => this.readPost()); 

  }

  createPost(content: string) {
    if (!this.authService.isAuthenticated()) {
      Swal.fire({
        icon: 'info',
        title: 'Debes iniciar sesión',
        text: 'Para comentar en el foro, primero debes iniciar sesión o registrarte.',
        showConfirmButton: true
      });
      return; // Salir del método
    }
  
    // Crear el objeto de post
    const post: Post = {
      interactionDto: {
        tmdbId: this.productId,
        isFilm: this.isFilm,
        postDate: this.postDate
      },
      postDto: {
        content: content,
      }
    };
  
    this.postService.createPost(post, this.token).subscribe(
      response => {
        console.log('Post creado:', response);
        this.newContent = '';
        this.readPost(); // Actualizar la lista de comentarios después de crear uno nuevo
      },
      error => {
        console.error('Error al crear el post:', error);
      }
    );
  }

  readPost(): void {
    let type: string;
    if (this.isFilm) {
      type = "movie";
    } else {
      type = "series";
    }
    const token = this.authService.getToken();
    if (token) {
      this.postService.readPost(type, this.productId).subscribe(dato => {
        this.Products = dato;
        this.visibleProducts = this.Products.slice(0, this.Products.length);
      },
        error => {
          console.error('Error al obtener producto', error);
        }
      );
    } else {
      console.error('Token no encontrado');
    }
  }

  deletePost(postId: number): void {
    this.postService.deletePost(this.token, postId).subscribe(
      response => {
        this.readPost();
      },
      error => {
        console.error('Error al eliminar el post:', error);
      }
    );
  }

  onScroll(event: any): void {
    const element = event.target;
    if (element.scrollHeight - element.scrollTop === element.clientHeight) {
      this.loadMoreProducts();
    }
  }

  loadMoreProducts(): void {
    const nextIndex = this.visibleProducts.length;
    const newProducts = this.Products.slice(nextIndex, nextIndex + 1);
    this.visibleProducts = this.visibleProducts.concat(newProducts);
  }

  scrollToTop(): void {
    const container = document.querySelector('.messages');
    if (container) {
      container.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }

  scrollToBottom(): void {
    const container = document.querySelector('.messages');
    if (container) {
      container.scrollTo({ top: container.scrollHeight, behavior: 'smooth' });
    }
  }
}
