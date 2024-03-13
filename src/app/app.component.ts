import { Component, OnDestroy, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NgxSkeletonLoaderModule } from 'ngx-skeleton-loader';
import { FetchdataService } from './fetchdata.service';
import { Subject, finalize, takeUntil, tap } from 'rxjs';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, NgxSkeletonLoaderModule, HttpClientModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  providers: [FetchdataService]
})
export class AppComponent implements OnInit, OnDestroy {
  title = 'skleton-screen';
  public fetchedAPiData: any[] = [];
  public isLoading = true;
  private unsubscribe$ = new Subject();

  constructor(private fetch: FetchdataService) { }
  ngOnInit(): void {
    setTimeout(() => {
      this.getDetails()
    }, 5000);
  }

  private getDetails() {
    this.fetch.getData().pipe(
      tap({
        next: (fetchedData) => {
          if (fetchedData) {
            this.fetchedAPiData = fetchedData
           }
        },
        error: (error) => alert(error)
      }),
      finalize(() => this.isLoading = false),
      takeUntil(this.unsubscribe$)).subscribe();
  }

  ngOnDestroy(): void {
    this.unsubscribe$.next(true);
    this.unsubscribe$.complete();
  }
}
