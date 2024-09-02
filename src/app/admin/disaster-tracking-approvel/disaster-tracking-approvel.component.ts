import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { DeleteServiceService } from 'src/app/service/delete-service.service';
import { GettingserviceService } from 'src/app/service/gettingservice.service';
import { PostServiceService } from 'src/app/service/post-service.service';

@Component({
  selector: 'app-disaster-tracking-approvel',
  templateUrl: './disaster-tracking-approvel.component.html',
  styleUrls: ['./disaster-tracking-approvel.component.css']
})
export class DisasterTrackingApprovelComponent implements OnInit {
  [x: string]: any;
  searchText: any = ''
  items?: any = []
  clicked = true

  disasterReg: any = []
  constructor(private getService: GettingserviceService, private postService: PostServiceService, private toastr: ToastrService, private deleteService: DeleteServiceService) { }
  async ngOnInit() {


    const storedUser = localStorage.getItem('user');
    console.log(storedUser);


    if (storedUser) {

      const user = JSON.parse(storedUser);
      const decryptedToken = await this.postService.decryptData(user.token, 'token');
      console.log('decrypt', decryptedToken);

      this.getService.getDiasterRegister(decryptedToken).subscribe((response) => {
        console.log('response', response);

        this.disasterReg = response.data
        this.items = response.data


      })



    }

    this.load()
  }
  load() {
    this.getService.getDiasterRegister().subscribe((response) => {
      console.log('response', response);
    });
  }

  async disasterApproval(item: any, action: any) {
    let actionTemp: any
    if (action == 'accept') {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        const decryptedToken = await this.postService.decryptData(user.token, 'token');
        console.log('item &token ', item, decryptedToken);

        this.postService.postDisAdminApprove(item.id, decryptedToken).subscribe((data: any) => {
          this.toastr.success(data.message);
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        },
          (error: any) => {
            console.error('login  error:', error);
            this.toastr.error(error.error.message, 'Error');
          }
        );

      }

    } else {

      this.toastr.error('Rejected');
    }
  }

  reject(item: any, action: any) {
    this.clicked = false
    this.postService.rejectDisaster(item.id, this.clicked).subscribe((data) => {

      console.log(data, 'hdgvjsgf');
      this.load();
      this.toastr.error(data.message);
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    })

  }

  filteredItems() {
    if (this.searchText != '') {


      this.disasterReg = this.items.filter((item: any) => item.location == this.searchText)
      console.log(this.searchText);

    } else {
      this.disasterReg = this.items
    }
  }

}