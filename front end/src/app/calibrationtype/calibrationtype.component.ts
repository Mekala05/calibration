import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { Calibrationtype } from './model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';

@Component({
  selector: 'app-calibrationtype',
  templateUrl: './calibrationtype.component.html',
  styleUrls: ['./calibrationtype.component.scss'],
})
export class CalibrationtypeComponent implements OnInit {
  public collection: any[] = [];
  public searchvalue: any;
  public HighlightRow: any;
  public HighlightHead: any = 1;
  public SearchField: string = ' calibrationtype';
  public BackUpdata = [] as any;
  public timeout: any = null;
  public registerDetails: Calibrationtype = {};
  showButton: boolean = false;
  public user_name: any = [];

  public TableHeading = [
    {
      name: 'SI No',
    },
    {
      name: 'calibration Type',
    },
    {
      name: 'Create On',
    },
    {
      name: 'Create By',
    },
    {
      name: 'Update On',
    },
    {
      name: 'Update By',
    },
    {
      name: 'Edit',
    },
    {
      name: 'Delete',
    },
  ];
  constructor(
    private dataservice: DataService,
    private toastr: ToastrService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.tabledata();
    this.user_name = localStorage.getItem('Login_name');
  }

  // Get All Data
  public tabledata(): void {
    this.dataservice.calibrationtype_getView().subscribe((data) => {
      console.log(data.data);
      this.collection = data.data;
      this.BackUpdata = data.data;
    });
  }
  // Delete the Particular Data
  public deleteUsers(id: string): void {
    // console.log(id);
    this.dataservice
      .calibrationtype_DeleteSingleUser(id, this.collection)
      .subscribe(
        (data: any) => {
          this.tabledata();
        },
        (err) => console.log('its error')
      );
  }
  // Insert the New Data
  public store(): void {
    // if (
    //   this.registerDetails.calibrationtype === undefined ||
    //   this.registerDetails.calibrationtype === ''
    // ) {
    //   alert('Enter the Details');
    // } else {
    //   this.dataservice.calibrationtype_postUser(this.registerDetails).subscribe(
    //     (data) => {
    //       // alert("Added");
    //       if (data.data) {
    //         this.toastr.success(
    //           'Created!!!',
    //           'RequestType Created Successfully.',
    //           {
    //             timeOut: 3000,
    //           }
    //         );
    //         let currentUrl = this.router.url;
    //         this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //         this.router.onSameUrlNavigation = 'reload';
    //         this.router.navigate([currentUrl]);
    //         this.tabledata();
    //       } else {
    //         if (data.error.errors[0].validatorKey) {
    //           this.toastr.error('Error!!!', 'RequestType Already Exists.', {
    //             timeOut: 3000,
    //           });
    //         }
    //       }
    //       // console.log(data.error.errors[0].validatorKey);
    //     },
    //     (err) => console.log('its error')
    //   );
    // }

    var calibrationtype = this.registerDetails.calibrationtype;

    if (calibrationtype == '' || calibrationtype == undefined) {
      this.toastr.warning('Warning!!!', ' calibrationtype is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    this.dataservice
      .calibrationtype_postUser(this.registerDetails)
      .subscribe((data) => {
        this.collection = data.data;

        let currentUrl = this.router.url;
        this.router.routeReuseStrategy.shouldReuseRoute = () => false;
        this.router.onSameUrlNavigation = 'reload';
        this.router.navigate([currentUrl]);
        this.tabledata();

        // this.dataservice.MasterTest_getViewtablerecord1().subscribe((data) => {
        //   this.BackUpdata = data.data;
        // });
      });
  }
  // Update the Exist Data
  update() {
    if (
      this.registerDetails.calibrationtype === '' ||
      this.registerDetails.calibrationtype === undefined
    ) {
      alert('Enter the Details');
    } else {
      this.dataservice
        .calibrationtype_updateSingleUser(
          this.registerDetails.id,
          this.registerDetails
        )
        .subscribe(
          (data) => {
            // alert("Update");
            // console.log(data);
            if (data.data) {
              this.toastr.success(
                'Updated!!!',
                'RequestType Updated Successfully.',
                {
                  timeOut: 3000,
                }
              );
              let currentUrl = this.router.url;
              this.router.routeReuseStrategy.shouldReuseRoute = () => false;
              this.router.onSameUrlNavigation = 'reload';
              this.router.navigate([currentUrl]);
              this.tabledata();
            } else {
              if (data.error.errors[0].validatorKey) {
                this.toastr.error('Error!!!', 'RequestType Already Exists.', {
                  timeOut: 3000,
                });
              }
            }
          },
          (err) => console.log(err)
        );
    }
  }

  getUser(id: object) {
    this.registerDetails = { ...id };
  }

  public Click_Head(index: number, heading: string): void {
    this.collection = [...this.BackUpdata];
    if (heading == 'Type') {
      this.SearchField = heading;
      this.HighlightHead = index;
      // this.searchvalue = "";
    } else {
      // this.toastr.info(`Search Field Invalid`);
    }
  }
  public Empty(): void {
    // if (!this.searchvalue) {
    //   this.collection = [...this.BackUpdata];
    // }
  }
  public onKeySearch(event: any) {
    // clearTimeout(this.timeout);
    // var $this = this;
    // this.timeout = setTimeout(function () {
    //   if (event.keyCode != 13) {
    //     // $this.SearchBy();
    //   }
    // }, 1000);
  }

  // public SearchBy(): void {
  //   console.log(this.collection);
  //   this.searchvalue = this.searchvalue.toUpperCase();
  //   if (this.searchvalue) {
  //     if (this.SearchField == "Type") {
  //       this.collection = this.collection.filter(f => f.RequestType == this.searchvalue);
  //     }
  //     else if (this.SearchField == "Create On") {
  //       // console.log(this.collection);
  //       this.collection = this.collection.filter(f => console.log(f.createdAt == this.searchvalue));
  //       console.log(this.collection);

  //     }
  //   }
  // }
  // Clear the data
  reset() {
    this.registerDetails.calibrationtype = '';
  }
}
