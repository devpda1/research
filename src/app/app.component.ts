import { Component, OnInit } from '@angular/core';
import { CentroAyudaService } from './centro-ayuda.service';
import { FrequentQuestion } from './models/frequent-question.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'explore-app';
  options: any[] = [
    
  ]
  frequentQuestions!: FrequentQuestion[];
  selectedOption:any

  constructor(private centroAyudaService: CentroAyudaService) {

  }

  ngOnInit():void{
    this.centroAyudaService.getData();
    setTimeout(()=>{
      
      this.options =  Object.keys(this.centroAyudaService.getAll())
      this.setInitialOptionSelected('BANCO')

    }, 500)
  }

  setInitialOptionSelected(alias: string): void {
    this.selectedOption = this.options.find(
      (option) => option.toUpperCase() === alias.toUpperCase()
    );
    this.getFrequentQuestions();
  }

  getFrequentQuestions(): void {
    this.frequentQuestions = this.centroAyudaService.get(this.selectedOption);
  }

  onSelect(option: any): void {
    this.selectedOption = option;
    this.getFrequentQuestions();
  }
}
