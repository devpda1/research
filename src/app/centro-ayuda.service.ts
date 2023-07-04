import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { FrequentQuestion } from './models/frequent-question.model';

@Injectable({
  providedIn: 'root'
})
export class CentroAyudaService {
  private data: any;
  private dataSub!: Subscription;
  private isData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(private httpClient: HttpClient) {
  }

  getData(): void {
    const headers = new HttpHeaders({
      'Content-Type': 'text/plain'
    });

    this.dataSub = this.httpClient
      .get('./assets/data/centro-ayuda.json', {
        headers,
        responseType: 'json'
      })
      .subscribe((response) => {
        console.log('response: ', response)
        this.data = response;
        this.isData.next(true);
        this.dataSub.unsubscribe();
      });
  }

  isDataSettled(): Observable<boolean> {
    return this.isData.asObservable();
  }

  get(key: string): FrequentQuestion[] {
    return this.data[key];
  }

  getAll():any{
    return this.data;
  }
}
