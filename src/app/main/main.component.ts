import { Component } from '@angular/core';
import { GettingserviceService } from '../service/gettingservice.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent {

  constructor(private service:GettingserviceService){}
  isLoading=false
  ngOnInit() {
    this.service.getMensCategories().subscribe((data: any) => {
      this.isLoading=true
    });
  }
}
