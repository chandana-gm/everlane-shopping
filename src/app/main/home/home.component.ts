import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { switchMap } from 'rxjs';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {



  @ViewChild('marquee') marquee!: ElementRef;
  selectedGender: string = 'Men';
  categories: any[] = [];
  womensCategories: any[] = [];
  banners: any;
  trending: any;
  randomNumber: any
  isLoading: boolean = false
  imageLoaded = false;
  isRecommendationsPopupOpen = false;
  recommendations: any
  quizForm!: FormGroup;
  answers: any[] = [];
  currentQuestionIndex: number = 0;
  isQuizCompleted: boolean = false;
  recommandationDataLoaded = false
  isMobile: boolean = false;

  answer2 = {
    gender: '',
    skin_color: '',
    height: '',
    preferred_season: '',
    usage_of_dress: ''
  }
  ngOnInit() {
    this.isMobile = window.innerWidth < 540;

    window.scroll(0, 0)
    this.api.getMensCategories().subscribe((data: any) => {
      this.categories = data.data;
    });
    this.api.getWomensCategories().subscribe((data: any) => {
      this.womensCategories = data.data;
    });
    this.api.getTrendingProducts().subscribe((data) => {
      this.trending = data.data;
    });
    // this.api.getBanners().subscribe((data) => {
    //   this.banners = data;
    //   this.imageLoaded=true
    //   this.isLoading = true
    // });
    this.loadBanners()


    this.randomNumber = Math.floor(Math.random() * 5 );


  }
  loadBanners() {
    if (this.isMobile) {
      this.api.getMobileWidthBanner().subscribe(data => {
        this.banners = data;
        this.imageLoaded = true
        this.isLoading = true
      });
    } else {
      this.api.getBanners().subscribe(data => {
        this.banners = data;
        this.imageLoaded = true
        this.isLoading = true
      });
    }
  }

  questions: any[] = [
    { question: 'Choose a gender', options: [{ display: 'Male', value: 'M' }, { display: 'Female', value: 'F' }] },
    { question: 'Select your skin texture', options: [{ display: 'Fair', value: 'FAIR' }, { display: 'Medium', value: 'MEDIUM' }, { display: 'Dark', value: 'DARK' }] },
    { question: 'Select your height', options: [{ display: 'Short', value: 'SHORT' }, { display: 'Medium', value: 'MEDIUM' }, { display: 'Tall', value: 'TALL' }] },
    { question: 'Style Preferences', options: [{ display: 'Casual', value: 'CASUAL' }, { display: 'Formal', value: 'FORMAL' }, { display: 'Sports', value: 'SPORTS' }, { display: 'Party', value: 'PARTY' }] },
    { question: 'Seasonal Wear', options: [{ display: 'Winter', value: 'WINTER' }, { display: 'Summer', value: 'SUMMER' }, { display: 'Monsoon', value: 'MONSOON' }, { display: 'Autumn', value: 'AUTUMN' }] }
  ];

  constructor(private fb: FormBuilder,
    private api: GettingserviceService,
    private router: Router,
    private service: PostServiceService,
    private deleteService: DeleteServiceService
  ) {
    this.quizForm = this.fb.group({
      answer: ['', Validators.required]
    });
  }

  onNext() {
    this.answers[this.currentQuestionIndex] = this.quizForm.value.answer;
    this.answer2.gender = this.answers[0]
    this.answer2.skin_color = this.answers[1]
    this.answer2.height = this.answers[2]
    this.answer2.usage_of_dress = this.answers[3]
    this.answer2.preferred_season = this.answers[4]
    if (this.currentQuestionIndex < this.questions.length - 1) {
      this.currentQuestionIndex++;
      this.quizForm.patchValue({ answer: this.answers[this.currentQuestionIndex] || '' });
    } else {
      this.isQuizCompleted = true;
    }
  }
  onPrevious() {
    if (this.currentQuestionIndex > 0) {
      this.answers[this.currentQuestionIndex] = this.quizForm.value.answer;
      this.currentQuestionIndex--;
      this.quizForm.patchValue({ answer: this.answers[this.currentQuestionIndex] });
    }
  }
  onSubmit() {
    this.recommandationDataLoaded = true
    this.isQuizCompleted = false
    this.answers[this.currentQuestionIndex] = this.quizForm.value.answer;
    console.log(this.answers);
    this.deleteService.recommendationPatch(this.answer2).pipe(
      switchMap(response => {

        return this.api.getRecommdation()
      })
    ).subscribe(
      data => {
        this.recommendations = data.data
        this.recommandationDataLoaded = false
        // this.isQuizCompleted=true

      },
      error => {
        console.error('Error:', error);
        this.recommandationDataLoaded = false;
      },
      () => {
        this.isQuizCompleted = true;
      }
    );
  }

  recommendationProducts(item: any) {
    this.router.navigate(['/shopping/detailsPage', item.id])

  }

  toggleRecommendationsPopup() {
    const token = localStorage.getItem('user')
    if (token) {
      this.isRecommendationsPopupOpen = !this.isRecommendationsPopupOpen;
      this.isQuizCompleted = false;
      this.currentQuestionIndex = 0;
      this.quizForm.reset();
      this.answers = []
    }
    else {
      this.router.navigate(['/auth/register'])
    }
  }
  selectGender(gender: string) {
    this.selectedGender = gender;
  }



  onCategoryClick(category: any) {
    this.router.navigate(['shopping/shoppingDetails', category.name]);
  }

  onImageClick(season: string) {
    this.router.navigate(['shopping/shoppingDetails', season]);
  }
  onTrendingClick(category:string){
    this.router.navigate(['shopping/shoppingDetails', category])
  }

  scrollLeft() {
    this.pauseMarquee();
    this.marquee.nativeElement.scrollBy({
      left: -200,
      behavior: 'smooth'
    });
    this.resumeMarquee();
  }

  scrollRight() {
    this.pauseMarquee();
    this.marquee.nativeElement.scrollBy({
      left: 200,
      behavior: 'smooth'
    });
    this.resumeMarquee();
  }

  pauseMarquee() {
    this.marquee.nativeElement.style.animationPlayState = 'paused';
  }

  resumeMarquee() {
    setTimeout(() => {
      this.marquee.nativeElement.style.animationPlayState = 'running';
    }, 500);
  }
  clicked(item: any) {
    console.log(item);
    this.router.navigate(['/shopping/detailsPage', item.id])

  }
}
