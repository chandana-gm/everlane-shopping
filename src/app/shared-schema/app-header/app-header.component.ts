import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.css']
})
export class AppHeaderComponent {


  quizForm!: FormGroup;
  answers: any[] = [];
  isAthenticated = false
  authenticatedUser = ''


  constructor(private fb: FormBuilder, private service: PostServiceService, private route: Router) {
    this.quizForm = this.fb.group({
      answer: ['', Validators.required]
    });
  }

  currentQuestionIndex: number = 0;
  isQuizCompleted: boolean = false;
  questions: any[] = [
    { question: 'Choose a gender', options: ["Male", 'Female'] },
    { question: 'Select your skin texture', options: ['Fair', 'Medium', 'Dark'] },
    { question: 'Select your height', options: ['Short', 'Medium', 'Tall'] },
    { question: 'Style Preferences', options: ['Casual', 'Formal', 'Sports', 'Party'] },
    { question: 'Seasonal Wear', options: ['Winter', 'Summer', 'Monsoon', 'Autumn'] },
  ];
  onNext() {
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
    this.isQuizCompleted = true

  }
  ngAfterViewInit() {
    const modalElement = document.getElementById('staticBackdrop');
    if (modalElement) {
      modalElement.addEventListener('hidden.bs.modal', () => this.resetModal());
    }
  }

  resetModal() {
    this.currentQuestionIndex = 0;
    this.isQuizCompleted = false;
    this.quizForm.reset();
  }
  ngOnInit() {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      this.authenticatedUser = user.username
      this.isAthenticated = true
      const decryptedToken = this.service.decryptData(user.token, 'token');
    } else {
      console.error('not authenticated');
    }

  }
  redirectToRegister() {
    this.route.navigate(['/auth/register'])
  }
  redirectToProfile() {
    this.route.navigate(['/main/profile'])
  }
  redirectToDonate(){
    this.route.navigate(['/donation/donation%home'])
  }
  redirectToWishlist(){
    this.route.navigate(['/main/wishlist'])
  }
  redirectToCart(){
    this.route.navigate(['/shopping/cart'])
  }


}
