import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit{

  ngOnInit(): void {
    window.scroll(0,0)
    
  }
  currentSection: string = 'section1';

  showsection(section: string) {
    this.currentSection = section;

}
}
