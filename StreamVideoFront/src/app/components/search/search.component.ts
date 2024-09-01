
import { Component, OnInit, inject } from '@angular/core';
import { EMPTY, Observable, Subject, Subscription, debounceTime, distinctUntilChanged, filter, switchMap } from 'rxjs';
import { Search } from '../../class/search';
import { SearchService } from '../../services/search.service';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrl: './search.component.css'
})
export class SearchComponent implements OnInit {
  searchTerm$ = new Subject<string>();
  busquedas!: Observable<Search[]>;

  private filterSvc = inject(SearchService);
  private router= inject(Router);
  language:string;

  private routeSubscription: Subscription = new Subscription();
  ngOnInit(): void {
    this.language = this.route.snapshot.paramMap.get('language');
    
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.language = params.get('language') || 'es';
      
    });
  }


  constructor(private route: ActivatedRoute) {
    this.busquedas = this.searchTerm$.pipe(
      filter((term: string) => term.length > 1),
      debounceTime(1), 
      distinctUntilChanged(),
      switchMap((term: string) => this.filterSvc.searchSeriesMovies(term,this.language))
    );

    this.busquedas.subscribe(data => {
    });
  }

  search(event: Event): void {
    const element = event.currentTarget as HTMLInputElement;
    console.log('datos introducidos en search:', element.value);  
    this.searchTerm$.next(element.value);
  }

  toggleClearButton(input: HTMLInputElement) {
    const clearButton = input.nextElementSibling as HTMLElement;
    if (input.value.trim() !== '') {
      clearButton.style.display = 'block';
    } else {
      clearButton.style.display = 'none';
    }
  }

  clearSearch(input: HTMLInputElement) {
    input.value = '';
    const clearButton = input.nextElementSibling as HTMLElement;
    clearButton.style.display = 'none';
  }

   // Pelis por id
   navigateToProduct(search:Search) {
    if(search.title){
      this.router.navigate(['/movie',this.language ,search.id]);
    }else{
      this.router.navigate(['/series',this.language, search.id]);
    }
  }
  
}
