import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { Subscription, filter } from 'rxjs';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.css'
})
export class FooterComponent  implements OnInit{

  language: string = 'es';
  private routerEventsSubscription: Subscription = new Subscription();

  constructor(private route: ActivatedRoute,
    private router: Router){
  }
  ngOnInit(): void {
    this.routerEventsSubscription = this.router.events.pipe(
      filter(event => event instanceof NavigationEnd)
    ).subscribe(() => {
      this.setLanguageFromUrl();

    });

  }
  private setLanguageFromUrl(): void {
    const currentUrl: string = this.router.url;
    const urlSegments = currentUrl.split('/');
    const langSegment = urlSegments.find(segment => segment === 'en' || segment === 'es');
    if (langSegment) {
      this.language = langSegment;
      console.log('Updated language from URL footer:', this.language);
    }
  }
}
