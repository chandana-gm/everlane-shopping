import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  quizForm!: FormGroup;
  answers: any[] = [];


   constructor(private fb: FormBuilder){ this.quizForm = this.fb.group({
    answer: ['', Validators.required]
  });}

  currentQuestionIndex: number = 0;
  isQuizCompleted: boolean = false;
   questions: any[] = [
     { question: 'Choose a gender', options: ["Male",'Female'] },
     { question: 'Select your skin texture', options: ['Fair','Medium','Dark'] },
     { question: 'Select your height', options: ['Short','Medium','Tall'] },
     { question: 'Style Preferences', options: ['Casual', 'Formal','Sports','Party'] },
     { question: 'Seasonal Wear', options: ['Winter', 'Summer', 'Monsoon', 'Autumn'] },
    ];
    onNext(){
      this.answers[this.currentQuestionIndex] = this.quizForm.value.answer;
      if (this.currentQuestionIndex < this.questions.length - 1) {
        this.currentQuestionIndex++;
        this.quizForm.patchValue({ answer: this.answers[this.currentQuestionIndex] || '' });
      }
    }
    
    onPrevious() {
      this.answers[this.currentQuestionIndex] = this.quizForm.value.answer;
      if (this.currentQuestionIndex > 0) {
        this.currentQuestionIndex--;
        this.quizForm.patchValue({ answer: this.answers[this.currentQuestionIndex] });
      }
    }
  
    onSubmit() {
      this.answers[this.currentQuestionIndex] = this.quizForm.value.answer;
      console.log('Quiz completed!', this.answers);
      this.isQuizCompleted=true
      
    }
    ngAfterViewInit() {
      const modalElement = document.getElementById('staticBackdrop');
      if (modalElement) {
        modalElement.addEventListener('hidden.bs.modal', () => this.resetModal());
      }
    }
  
    resetModal(){
      this.currentQuestionIndex = 0; 
      this.isQuizCompleted = false;
      this.quizForm.reset();
    }
  

}
