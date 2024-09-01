import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-subscriptionContract',
  templateUrl: './subscriptionContract.component.html',
  styleUrl: './subscriptionContract.component.css'
})
export class SubscriptionContractComponent implements OnInit {
  private routeSubscription: Subscription = new Subscription();
  language:string;

  constructor(private route: ActivatedRoute){}

  ngOnInit(): void {
    this.language = this.route.snapshot.paramMap.get('language');
    this.routeSubscription = this.route.paramMap.subscribe(params => {
      this.language = params.get('language') || 'es';
      console.log("MUESTA : "+ this.language)
    });
  }
}
