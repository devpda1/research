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
    {
      alias: 'BANCO',
      nombre: 'Banco'
    },
    {
      alias: 'TRADING',
      nombre: 'Trading'
    },
    {
      alias: "CLOUDINARY",
      nombre: 'Cloudinary'
    },
    {
      alias: "AIRTM",
      nombre: "Airtm"
    }
  ]
  frequentQuestions!: FrequentQuestion[];
  selectedOption:any

  constructor(private centroAyudaService: CentroAyudaService) {

  }

  ngOnInit():void{
    this.centroAyudaService.getData();
    setTimeout(()=>{
      
      this.setInitialOptionSelected('BANCO')

    }, 500)
  }

  setInitialOptionSelected(alias: string): void {
    this.selectedOption = this.options.find(
      (option) => option.alias.toUpperCase() === alias.toUpperCase()
    );
    console.log('selectedOption: ', this.selectedOption)
    this.getFrequentQuestions();
  }

  getFrequentQuestions(): void {
    this.frequentQuestions = this.centroAyudaService.get(this.selectedOption.alias);
  }

  onSelect(option: any): void {
    console.log('option: ', option)
    this.selectedOption = option;
    this.getFrequentQuestions();
  }
}
