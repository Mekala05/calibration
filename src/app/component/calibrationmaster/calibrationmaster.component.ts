import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/app/shared/service/data.service';
import { master } from './model';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { DatePipe } from '@angular/common';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import { RouterModule, Routes } from '@angular/router';

// import { FileUploadService } from 'src/app/services/file-upload.service';

import { HttpClient, HttpRequest, HttpEvent } from '@angular/common/http';
import { Injectable } from '@angular/core';

// import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
//import { Console } from 'console';

@Injectable({
  providedIn: 'root',
})
@Component({
  selector: 'app-calibrationmaster',
  templateUrl: './calibrationmaster.component.html',
  styleUrls: ['./calibrationmaster.component.scss'],
})
export class CalibrationmasterComponent implements OnInit {
  src = 'https://vadimdez.github.io/ng2-pdf-viewer/assets/pdf-test.pdf';
  public previousDate!: Date;
  public registerDetails: master = {};
  public collection: any[] = [];
  public targetpath: any;
  public Category: any[] = [];
  uploadService: any[] = [];
  public Type: any[] = [];
  uploadedFiles: any[] = [];
  attachmentdelete: any[] = [];
  images: any;
  event: any[] = [];
  element: any[] = [];
  mydata: any[] = [];
  public collectiondata: any[] = [];
  public CurrentLocation: any[] = [];
  public text: any;
  public Make: any[] = [];
  public data: any[] = [];

  public newDynamic: any[] = [];
  public MxLifeTimeNumber: any[] = [];
  public BackUpdata = [] as any;
  public validate: any;
  public instrument: any[] = [];
  public instrumentnameof: any[] = [];
  public BranchUnit: any[] = [];
  public codeValue: any;
  public valueof: any;
  public storeDetails: any[] = [];
  public Location: any[] = [];
  public InstrumentCode: any[] = [];
  public SAPRefferenceCode: any[] = [];
  public InstrumentCodeof: any[] = [];
  typeof: any[] = [];
  // type: any[] = [];
  public timeout: any = null;
  public searchvalue: any;
  public HighlightRow: any;
  public HighlightHead: any = 1;
  public date: any;
  public SearchField: string = 'Description';
  public user_name: any = [];
  public MxLifeTime: any = [];
  // uploadedFiles: any = [];
  public saveAs: any;
  public butDisabled = false;
  public instruname: any;
  public Departmentof: any;
  public locationselect: any;
  public isShown: boolean = true;
  public instrucodetionselect: any;
  public maximumTime: any;

  public Heading = [
    {
      name: 'SI No',
    },
    {
      name: 'Choosefile',
    },
    {
      name: 'View',
    },
    {
      name: 'Download',
    },
    {
      name: 'Delete',
    },
  ];

  public TableHeading = [
    {
      name: 'SI No',
    },
    {
      name: 'Description',
    },
    {
      name: 'Specification',
    },
    {
      name: 'Observation',
    },
    {
      name: 'Remark',
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
    private datePipe: DatePipe,
    private routers: ActivatedRoute,
    private http: HttpClient,
    // private uploadService: FileUploadService,
    private router: Router // private router: Router
  ) {
    {
      if (this.routers.snapshot.queryParams.id) {
        this.dataservice
          .MasterTest_getViewData(this.routers.snapshot.queryParams.id)
          .subscribe(
            (data: any) => {
              console.log(data);
              this.registerDetails.InstrumentName = data.data[0].InstrumentName;

              this.registerDetails.InstrumentCode = data.data[0].InstrumentCode;

              this.registerDetails.category = data.data[0].category;

              this.category('', data.data[0].category);

              this.registerDetails.type = data.data[0].type;
              this.typemaster('', data.data[0].type);

              this.registerDetails.MasterType = data.data[0].MasterType;
              this.registerDetails.InstrumentRefferenceCode =
                data.data[0].InstrumentRefferenceCode;
              // this.registerDetails.InstrumentName = data.data[0].InstrumentName;
              // this.registerDetails.InstrumentCode = data.data[0].InstrumentCode;
              this.registerDetails.Location = data.data[0].Location;
              this.registerDetails.CurrentLocation =
                data.data[0].CurrentLocation;
              this.registerDetails.make = data.data[0].make;
              this.registerDetails.Department = data.data[0].Department;
              this.registerDetails.range = data.data[0].range;
              this.registerDetails.Specification = data.data[0].Specification;
              this.registerDetails.masterspecification =
                data.data[0].masterspecification;

              this.registerDetails.Description = data.data[0].Description;
              this.registerDetails.Remark = data.data[0].Remark;
              this.registerDetails.MxLifeTime = data.data[0].MxLifeTime;
              this.registerDetails.SAPRefferenceCode =
                data.data[0].SAPRefferenceCode;

              this.registerDetails.Observation = data.data[0].Observation;
              this.registerDetails.MxLifeTimeNumber =
                data.data[0].MxLifeTimeNumber;

              this.registerDetails.active = data.data[0].active;
              this.registerDetails.amccheckbox = data.data[0].amccheckbox;
            },
            () => console.log('its error')
          );

        // }
      }
    }
  }

  ngOnInit(): void {
    this.getCategory();
    this.getType();
    this.getMake();
    // this.Instrument();
    this.type();
    this.tabledata();
    // this.SAPRefferenceCodefun();
    //this.Departmentof();

    // this.getLocation();

    // this.Branchunit();

    this.registerDetails.date = new Date();
    this.registerDetails.dueDate = new Date();

    this.user_name = localStorage.getItem('Login_name');

    // this.dataservice.MasterTest_getViewtablerecord1().subscribe((data) => {
    //   console.log('asdfadf', data);

    //   this.collection = data.data;
    //   // this.BackUpdata = data.data;
    // });
    // this.tabledata();
  }

  public loadInstrument(): void {}
  private tabledata1(): void {
    this.dataservice.MasterTest_getViewtablerecord1().subscribe((data) => {
      this.collection = data.data;
      this.BackUpdata = data.data;
    });
  }
  private tabledata(): void {
    // this.dataservice.MasterTest_getViewtablerecord1().subscribe((data) => {
    //   this.collection = data.data;
    //   this.BackUpdata = data.data;
    // });

    // this.dataservice.MasterTest_getView().subscribe((data) => {
    //   console.log('tabledata', data.data);
    //   this.collection = data.data;
    //   this.BackUpdata = data.data;
    // });
    // console.log(this.collection);

    this.dataservice.calibrationmaster_getView().subscribe((data) => {
      // console.log(data.data);

      // this.collection = data.data;
      this.BackUpdata = data.data;
      this.instrumentnameof = data.data;
    });
    // console.log(this.collection);

    this.dataservice.MasterTest_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.InstrumentCodeof = data.data;
      // this.BackUpdata = data.data;
    });

    // this.dataservice.Calibrationlocationmaster_getView().subscribe((data) => {
    //   console.log(data.data);
    //   // console.log(data.data[0].type);

    //   this.BranchUnit = data.data;
    //   // this.BackUpdata = data.data;
    // });

    this.dataservice.locationmasterdepartmet_getView().subscribe((data) => {
      console.log(data.data);
      // console.log(data.data[0].type);
      this.Departmentof = data.data;
      // this.BackUpdata = data.data;
    });

    // this.dataservice
    //   .MasterTest_getViewParticular_getView_sapref()
    //   .subscribe((data) => {
    //     // console.log('tt',data.data);

    //     this.SAPRefferenceCode = data.data;
    //   });

    // this.dataservice
    //   .MasterTest_getViewParticular_getView_sapref()
    //   .subscribe((data) => {
    //     // console.log('tt',data.data);

    //     this.SAPRefferenceCode = data.data;
    //   });

    this.dataservice.Calibrationlocationmaster_getView().subscribe((data) => {
      console.log(data);
      this.Location = data.data;
      // debugger
      // console.log("usdhfshdgoifdhgi");
      console.log(this.Location);
      // this.BackUpdata = data.data;
    });
  }
  update() {
    if (
      this.registerDetails.Description === '' ||
      this.registerDetails.Specification === '' ||
      this.registerDetails.category === '' ||
      this.registerDetails.type === '' ||
      this.registerDetails.MasterType === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      // this.registerDetails.make === '' ||
      this.registerDetails.range === '' ||
      this.registerDetails.masterspecification === '' ||
      this.registerDetails.date === undefined ||
      this.registerDetails.MxLifeTime === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.active === undefined ||
      this.registerDetails.amccheckbox === undefined ||
      this.registerDetails.Observation === '' ||
      this.registerDetails.Remark === '' ||
      this.registerDetails.Description === '' ||
      this.registerDetails.Specification === '' ||
      this.registerDetails.CurrentLocation === '' ||
      this.registerDetails.Observation === '' ||
      this.registerDetails.Remark === '' ||
      this.registerDetails.category === '' ||
      this.registerDetails.type === '' ||
      this.registerDetails.Department === '' ||
      this.registerDetails.MasterType === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      this.registerDetails.make === '' ||
      this.registerDetails.range === '' ||
      // this.registerDetails.masterspecification === '' ||
      this.registerDetails.MxLifeTime === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.Specification === undefined ||
      this.registerDetails.category === undefined ||
      // this.registerDetails.type === undefined ||
      this.registerDetails.MasterType === undefined ||
      this.registerDetails.SAPRefferenceCode === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      // this.registerDetails.make === '' ||
      this.registerDetails.range === '' ||
      // this.registerDetails.masterspecification === '' ||
      this.registerDetails.date === undefined ||
      this.registerDetails.MxLifeTime === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.active === undefined ||
      this.registerDetails.amccheckbox === undefined ||
      this.registerDetails.Observation === '' ||
      this.registerDetails.Remark === '' ||
      this.registerDetails.Description === '' ||
      this.registerDetails.Specification === '' ||
      this.registerDetails.CurrentLocation === '' ||
      this.registerDetails.Observation === '' ||
      this.registerDetails.Remark === '' ||
      this.registerDetails.category === '' ||
      // this.registerDetails.type === '' ||
      this.registerDetails.MasterType === '' ||
      this.registerDetails.InstrumentCode === '' ||
      this.registerDetails.InstrumentName === '' ||
      // this.registerDetails.make === '' ||
      this.registerDetails.range === '' ||
      // this.registerDetails.file === '' ||

      // this.registerDetails.masterspecification === '' ||
      this.registerDetails.MxLifeTime === '' ||
      this.registerDetails.MxLifeTimeNumber === '' ||
      this.registerDetails.InstrumentRefferenceCode === ''
    ) {
      alert('Enter the Details');
    } else {
      console.log(`dsd  ${this.registerDetails.InstrumentCode}`);
      // this.submitted = true;
      this.dataservice
        .MasterTest_updateSingleUser(
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
                'Calibration Master & Error Description Updated Successfully.',
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
                this.toastr.error(
                  'Error!!!',
                  'Calibration Master & Error Description Already Exists.',
                  {
                    timeOut: 3000,
                  }
                );
              }
            }
          },
          (err) => console.log(err)
        );
    }
  }
  // onDateChange(newDate: Date) {
  //   this.previousDate = new Date(newDate);
  // }
  getUser(id: object) {
    this.registerDetails = { ...id };
    // console.log(this.registerDetails.date);
    this.date = this.datePipe.transform(
      this.registerDetails.date,
      'dd-mm-yyyy'
    );
    this.registerDetails.date = this.date;
    // console.log(this.registerDetails.date);
    this.user_name = this.user_name;
  }
  // public deleteUsers(id: Number): void {
  //   // console.log(id);
  //   this.dataservice.MasterTest_DeleteSingleUser(id, this.collection).subscribe(
  //     () => {
  //       this.tabledata();
  //     },
  //     () => console.log('its error')
  //   );
  // }

  public deleteUsers(id: string): void {
    console.log(id);
    // debugger;
    this.dataservice.MasterTest_DeleteSingleUser(id, this.collection).subscribe(
      (data: any) => {
        this.tabledata();
      },
      (err) => console.log('its error')
    );
  }

  public selectimage(event: any) {
    debugger;
    if (event.target.files.length > 0) {
      const files = event.target.files[0];
      this.images = files;
    }
  }

  public store(): void {
    // this.date = this.datePipe.transform(this.registerDetails.date, 'yyyy-MM-dd,h:mm a');
    // this.registerDetails.date = this.date;
    // console.log(this.registerDetails.date);

    // if (
    //   this.registerDetails.Description === '' ||
    //   this.registerDetails.Specification === '' ||
    //   this.registerDetails.category === '' ||
    //   this.registerDetails.type === '' ||
    //   this.registerDetails.MasterType === '' ||
    //   this.registerDetails.InstrumentCode === '' ||
    //   this.registerDetails.InstrumentName === '' ||
    //   this.registerDetails.make === '' ||
    //   this.registerDetails.range === '' ||
    //   this.registerDetails.masterspecification === '' ||
    //   this.registerDetails.MxLifeTime === '' ||
    //   this.registerDetails.MxLifeTimeNumber === '' ||
    //   this.registerDetails.MxLifeTimeNumber === '' ||
    //   this.registerDetails.active === undefined ||
    //   this.registerDetails.amccheckbox === undefined ||
    //   this.registerDetails.Observation === '' ||
    //   this.registerDetails.Remark === '' ||
    //   this.registerDetails.Description === '' ||
    //   this.registerDetails.Specification === '' ||
    //   this.registerDetails.Observation === '' ||
    //   this.registerDetails.Remark === '' ||
    //   this.registerDetails.category === '' ||
    //   this.registerDetails.Department === '' ||
    //   // this.registerDetails.type === '' ||
    //   this.registerDetails.MasterType === '' ||
    //   this.registerDetails.SAPRefferenceCode === '' ||
    //   this.registerDetails.InstrumentCode === '' ||
    //   this.registerDetails.InstrumentName === '' ||
    //   this.registerDetails.make === '' ||
    //   // this.registerDetails.range === '' ||
    //   this.registerDetails.masterspecification === '' ||
    //   // this.registerDetails.MxLifeTime === '' ||
    //   // this.registerDetails.MxLifeTimeNumber === '' ||
    //   this.registerDetails.MxLifeTimeNumber === ''
    // ) {
    //   alert('Enter the Details');
    // } else {
    //   this.registerDetails.InstrumentCode = this.codeValue;
    //   console.log(this.codeValue);
    //   console.log('sdfasdfasdf', this.registerDetails);

    //   this.dataservice.MasterTest_postUser(this.registerDetails).subscribe(
    //     (data) => {
    //       this.dataservice
    //         .MasterTest_getViewtablerecord1()
    //         .subscribe((data) => {
    //           this.collection = data.data;
    //           this.BackUpdata = data.data;
    //         });

    //       // alert("Added");
    //       if (data.data) {
    //         this.toastr.success(
    //           'Created!!!',
    //           'Calibration Master & Error Description Created Successfully.',
    //           {
    //             timeOut: 3000,
    //           }
    //         );
    //         this.registerDetails.Description = '';
    //         this.registerDetails.Specification = '';
    //         this.registerDetails.Observation = '';
    //         this.registerDetails.Remark = '';

    //         let currentUrl = this.router.url;
    //         //this.router.routeReuseStrategy.shouldReuseRoute = () => false;
    //         //this.router.onSameUrlNavigation = 'reload';
    //         //this.router.navigate([currentUrl]);
    //         this.tabledata();
    //       } else {
    //         if (data.error.errors[0].validatorKey) {
    //           this.toastr.error(
    //             'Error!!!',
    //             'Calibration Master & Error Description Already Exists.',
    //             {
    //               timeOut: 3000,
    //             }
    //           );
    //         }
    //       }
    //     },
    //     () => console.log('its error')
    //   );
    // }

    var category = this.registerDetails.category;
    var type = this.registerDetails.type;
    var MasterType = this.registerDetails.MasterType;
    var InstrumentCode = this.registerDetails.InstrumentCode;
    var InstrumentName = this.registerDetails.InstrumentName;
    var make = this.registerDetails.make;
    var range = this.registerDetails.range;
    var masterspecification = this.registerDetails.masterspecification;
    var CurrentLocation = this.registerDetails.CurrentLocation;
    var date = this.registerDetails.date;
    // var MxLifeTime = this.registerDetails.MxLifeTime;
    var MxLifeTimeNumber = this.registerDetails.MxLifeTimeNumber;
    var Location = this.registerDetails.Location;
    var file = this.registerDetails.file;
    var active = this.registerDetails.active;
    // var amccheckbox = this.registerDetails.amccheckbox;
    var Description = this.registerDetails.Description;
    var Specification = this.registerDetails.Specification;

    var Observation = this.registerDetails.Observation;
    var Remark = this.registerDetails.Remark;
    // var fileErrorDiscription = this.registerDetails.fileErrorDiscription;
    var InstrumentRefferenceCode =
      this.registerDetails.InstrumentRefferenceCode;
    var SAPRefferenceCode = this.registerDetails.SAPRefferenceCode;
    var Department = this.registerDetails.Department;
    var dueDate = this.registerDetails.dueDate;

    if (category == '' || category == undefined) {
      this.toastr.warning('Warning!!!', 'category is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (type == '' || type == undefined) {
      this.toastr.warning('Warning!!!', 'type  is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (MasterType == '' || MasterType == undefined) {
      this.toastr.warning('Warning!!!', 'MasterType is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (InstrumentCode == '' || InstrumentCode == undefined) {
      this.toastr.warning('Warning!!!', 'InstrumentCode is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (InstrumentName == '' || InstrumentName == undefined) {
      this.toastr.warning('Warning!!!', 'InstrumentName is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (make == '' || make == undefined) {
      this.toastr.warning('Warning!!!', 'make is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (range == '' || range == undefined) {
      this.toastr.warning('Warning!!!', 'range is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (masterspecification == '' || masterspecification == undefined) {
      this.toastr.warning('Warning!!!', 'masterspecification is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (CurrentLocation == '' || CurrentLocation == undefined) {
      this.toastr.warning('Warning!!!', 'CurrentLocation is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (date == undefined || date == undefined) {
      this.toastr.warning('Warning!!!', 'date is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    // if (MxLifeTime == '' || MxLifeTime == undefined) {
    //   this.toastr.warning('Warning!!!', 'MxLifeTime is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    // if (MxLifeTimeNumber == '' || MxLifeTimeNumber == undefined) {
    //   this.toastr.warning('Warning!!!', 'MxLifeTimeNumber is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    if (Location == '' || Location == undefined) {
      this.toastr.warning('Warning!!!', 'Location is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    // if (file == '' || file == undefined) {
    //   this.toastr.warning('Warning!!!', 'file is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    // if (amccheckbox == undefined || amccheckbox == undefined) {
    //   this.toastr.warning('Warning!!!', 'amccheckbox is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    if (Description == '' || Description == undefined) {
      this.toastr.warning('Warning!!!', 'Description is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (Specification == '' || Specification == undefined) {
      this.toastr.warning('Warning!!!', 'Specification is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (Observation == '' || Observation == undefined) {
      this.toastr.warning('Warning!!!', 'Observation is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (Remark == '' || Remark == undefined) {
      this.toastr.warning('Warning!!!', 'Remark is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    // if (
    //   fileErrorDiscription == undefined ||
    //   fileErrorDiscription == undefined
    // ) {
    //   this.toastr.warning('Warning!!!', 'fileErrorDiscription is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    if (
      InstrumentRefferenceCode == '' ||
      InstrumentRefferenceCode == undefined
    ) {
      this.toastr.warning(
        'Warning!!!',
        'InstrumentRefferenceCode is required!',
        {
          timeOut: 3000,
        }
      );
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (SAPRefferenceCode == '' || SAPRefferenceCode == undefined) {
      this.toastr.warning('Warning!!!', 'SAPRefferenceCode required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (Department == '' || Department == undefined) {
      this.toastr.warning('Warning!!!', 'Departmentis required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (dueDate == undefined || dueDate == undefined) {
      this.toastr.warning('Warning!!!', 'dueDate is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }
    // this.registerDetails.file = this.images;

    //console.log('vvvv      ', this.images);

    // this.dataservice.fileupload(this.registerDetails).subscribe((data) => {
    //   console.log(data);
    //   // this.Location = data.data;
    // });

    const imagedata = new FormData();
    imagedata.append('image', this.images);
    this.dataservice.MasterImage_postUser(imagedata).subscribe((data) => {
      console.log('working...');
    });

    this.dataservice.MasterTest_postUser(this.registerDetails).subscribe(
      (data) => {
        this.dataservice.MasterTest_getViewtablerecord1().subscribe((data) => {
          this.collection = data.data;
          this.BackUpdata = data.data;
        });

        // alert("Added");
        if (data.data) {
          this.toastr.success(
            'Created!!!',
            'Calibration Master & Error Description Created Successfully.',
            {
              timeOut: 3000,
            }
          );
          this.registerDetails.Description = '';
          this.registerDetails.Specification = '';
          this.registerDetails.Observation = '';
          this.registerDetails.Remark = '';

          let currentUrl = this.router.url;
          this.router.routeReuseStrategy.shouldReuseRoute = () => false;
          this.router.onSameUrlNavigation = 'reload';
          this.router.navigate([currentUrl]);
          this.tabledata();
        } else {
          if (data.error.errors[0].validatorKey) {
            this.toastr.error(
              'Error!!!',
              'Calibration Master & Error Description Already Exists.',
              {
                timeOut: 3000,
              }
            );
          }
        }
      },
      () => console.log('its error')
    );
  }

  adderror() {
    var category = this.registerDetails.category;
    var type = this.registerDetails.type;
    var MasterType = this.registerDetails.MasterType;
    var InstrumentCode = this.registerDetails.InstrumentCode;
    var InstrumentName = this.registerDetails.InstrumentName;
    var make = this.registerDetails.make;
    var range = this.registerDetails.range;
    var masterspecification = this.registerDetails.masterspecification;
    var CurrentLocation = this.registerDetails.CurrentLocation;
    var date = this.registerDetails.date;
    // var MxLifeTime = this.registerDetails.MxLifeTime;
    var MxLifeTimeNumber = this.registerDetails.MxLifeTimeNumber;
    var Location = this.registerDetails.Location;
    // var file = this.registerDetails.file;
    var active = this.registerDetails.active;
    // var amccheckbox = this.registerDetails.amccheckbox;
    var Description = this.registerDetails.Description;
    var Specification = this.registerDetails.Specification;
    var Observation = this.registerDetails.Observation;
    var Remark = this.registerDetails.Remark;
    // var fileErrorDiscription = this.registerDetails.fileErrorDiscription;
    var InstrumentRefferenceCode =
      this.registerDetails.InstrumentRefferenceCode;
    var SAPRefferenceCode = this.registerDetails.SAPRefferenceCode;
    var Department = this.registerDetails.Department;
    var dueDate = this.registerDetails.dueDate;

    if (category == '' || category == undefined) {
      this.toastr.warning('Warning!!!', 'category is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (type == '' || type == undefined) {
      this.toastr.warning('Warning!!!', 'type  is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (MasterType == '' || MasterType == undefined) {
      this.toastr.warning('Warning!!!', 'MasterType is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (InstrumentCode == '' || InstrumentCode == undefined) {
      this.toastr.warning('Warning!!!', 'InstrumentCode is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (InstrumentName == '' || InstrumentName == undefined) {
      this.toastr.warning('Warning!!!', 'InstrumentName is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (make == '' || make == undefined) {
      this.toastr.warning('Warning!!!', 'make is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (range == '' || range == undefined) {
      this.toastr.warning('Warning!!!', 'range is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (masterspecification == '' || masterspecification == undefined) {
      this.toastr.warning('Warning!!!', 'masterspecification is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (CurrentLocation == '' || CurrentLocation == undefined) {
      this.toastr.warning('Warning!!!', 'CurrentLocation is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (date == undefined || date == undefined) {
      this.toastr.warning('Warning!!!', 'date is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (MxLifeTime == '' || MxLifeTime == undefined) {
    //   this.toastr.warning('Warning!!!', 'MxLifeTime is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    // if (MxLifeTimeNumber == '' || MxLifeTimeNumber == undefined) {
    //   this.toastr.warning('Warning!!!', 'MxLifeTimeNumber is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    if (Location == '' || Location == undefined) {
      this.toastr.warning('Warning!!!', 'Location is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (file == undefined || file == undefined) {
    //   this.toastr.warning('Warning!!!', 'file is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    // if (amccheckbox == undefined || amccheckbox == undefined) {
    //   this.toastr.warning('Warning!!!', 'amccheckbox is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    if (Description == '' || Description == undefined) {
      this.toastr.warning('Warning!!!', 'Description is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Specification == '' || Specification == undefined) {
      this.toastr.warning('Warning!!!', 'Specification is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Observation == '' || Observation == undefined) {
      this.toastr.warning('Warning!!!', 'Observation is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    if (Remark == '' || Remark == undefined) {
      this.toastr.warning('Warning!!!', 'Remark is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
    }

    // if (
    //   fileErrorDiscription == undefined ||
    //   fileErrorDiscription == undefined
    // ) {
    //   this.toastr.warning('Warning!!!', 'fileErrorDiscription is required!', {
    //     timeOut: 3000,
    //   });
    //   (<HTMLInputElement>document.getElementById('id')).focus();
    //   // return false;
    // }

    if (
      InstrumentRefferenceCode == '' ||
      InstrumentRefferenceCode == undefined
    ) {
      this.toastr.warning(
        'Warning!!!',
        'InstrumentRefferenceCode is required!',
        {
          timeOut: 3000,
        }
      );
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (SAPRefferenceCode == '' || SAPRefferenceCode == undefined) {
      this.toastr.warning('Warning!!!', 'SAPRefferenceCode required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (Department == '' || Department == undefined) {
      this.toastr.warning('Warning!!!', 'Departmentis required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    if (dueDate == undefined || dueDate == undefined) {
      this.toastr.warning('Warning!!!', 'dueDate is required!', {
        timeOut: 3000,
      });
      (<HTMLInputElement>document.getElementById('id')).focus();
      // return false;
    }

    this.dataservice
      .MasterTest_postUser(this.registerDetails)
      .subscribe((data) => {
        this.collection = data.data;
        this.BackUpdata = data.data;
        (this.registerDetails.Description = ''),
          (this.registerDetails.Specification = ''),
          (this.registerDetails.Observation = ''),
          (this.registerDetails.Remark = ''),
          this.dataservice
            .MasterTest_getViewtablerecord1()
            .subscribe((data) => {
              this.collection = data.data;
              this.BackUpdata = data.data;
            });
      });
  }

  reset() {
    (this.registerDetails.Description = ''),
      (this.registerDetails.Specification = ''),
      (this.registerDetails.Observation = ''),
      (this.registerDetails.Remark = ''),
      (this.registerDetails.category = ''),
      (this.registerDetails.type = ''),
      (this.registerDetails.MasterType = ''),
      (this.registerDetails.InstrumentCode = ''),
      (this.registerDetails.InstrumentName = ''),
      (this.registerDetails.make = ''),
      (this.registerDetails.range = ''),
      (this.registerDetails.masterspecification = ''),
      // this.registerDetails.date = '',
      (this.registerDetails.MxLifeTime = ''),
      (this.registerDetails.MxLifeTimeNumber = ''),
      (this.registerDetails.InstrumentRefferenceCode = ''),
      (this.registerDetails.SAPRefferenceCode = ''),
      (this.registerDetails.CurrentLocation = ''),
      (this.registerDetails.Department = ''),
      (this.registerDetails.Location = '');
  }

  public getCategory(): void {
    this.dataservice.MasterCategory_getView().subscribe((data) => {
      // console.log(data.data[0].category);
      this.Category = data.data;
      // console.log(this.Category);
      // this.BackUpdata = data.data;
    });
  }
  public getType(): void {
    this.dataservice.MasterType_getView().subscribe((data) => {
      // console.log(data.data[0].type);
      this.Type = data.data;
      // this.BackUpdata = data.data;
    });
  }

  public getMake(): void {
    this.dataservice.MasterMake_getView().subscribe((data) => {
      // console.log(data.data[0].description);
      this.Make = data.data;
      // this.BackUpdata = data.data;
    });
  }

  GetStats(event: any) {
    let selectedLaw: any = event.target.checked;
    console.log(selectedLaw);
  }

  //   res(event: any) {
  //     let selectedLaw: any = event.target.value;
  // this.instruname=selectedLaw;
  // console.log("instrumentname",this.instruname);

  //     // this.butDisabled = true;

  //   }

  locationdata(event: any) {
    //debugger;

    let selectedLaw: any = event.target.value;
    // this.locationselect = selectedLaw;
    //console.log('00000000          ' + selectedLaw);
    var shortname = selectedLaw.split(',');
    var instrument_code: any = this.InstrumentCodeof;
    console.log(instrument_code);
    debugger;
    let code = instrument_code.split('||');
    let typesortname = this.valueof;
    let tsortname = typesortname.split('||');

    console.log('inssd', code[0]);
    this.registerDetails.InstrumentRefferenceCode = shortname[0];
    this.registerDetails.InstrumentCode = shortname[0];

    this.codeValue = this.locationselect + '-' + this.InstrumentCodeof;
    this.registerDetails.InstrumentRefferenceCode =
      shortname[0] + '-' + this.InstrumentCodeof;
    this.registerDetails.InstrumentCode =
      shortname[0] + '-' + tsortname[1] + '-' + code[0];

    this.InstrumentCodeof + '-' + shortname[0];

    this.registerDetails.InstrumentRefferenceCode =
      shortname[0] + '-' + tsortname[1] + '-' + code[0];

    // this.InstrumentRefferenceCode + '-' + shortname[0];

    this.registerDetails.Department = selectedLaw[2];

    this.dataservice.departmentdata(shortname[0]).subscribe((data) => {
      // console.log(data.data[0].Department);
      this.registerDetails.Department = data.data[0].Department;
    });

    this.dataservice
      .MasterTest_getViewParticular_getView_sapref1(shortname[1])
      .subscribe((data) => {
        // console.log('tt',data.data);
        this.SAPRefferenceCode = data.data;
      });
  }

  public type(): void {
    this.dataservice.type_getView().subscribe((data) => {
      // console.log('fgh', data);

      console.log(data.data[0].InstrumentName);

      // console.log(data.data[0].CategoryMaster.id);
      // console.log(data.data[0].CategoryMaster.category);

      this.type = data.data;
      // this.BackUpdata = data.data;
    });
  }

  code(event: any) {
    // alert(event);
    let selectedLaw: any = event.target.value;

    let coderesult = selectedLaw.split(',');
    this.codeValue = coderesult[1];
    console.log(coderesult);
    // var shortname = selectedLaw.split(',');
    // this.registerDetails.InstrumentCode = shortname[0];

    this.registerDetails.InstrumentCode = coderesult[1];
    this.registerDetails.InstrumentRefferenceCode = coderesult[1];
    // this.registerDetails.InstrumentName = coderesult[1];
    // this.registerDetails.InstrumentName=coderesult[1];
    this.InstrumentCodeof = selectedLaw;
    console.log('InstrumentCodeof', this.InstrumentCodeof);
  }

  lifeTime(event: any) {
    let selectedLaw: any = event.target.value;
    debugger;
    this.maximumTime = selectedLaw;
    if (selectedLaw == 'Quarterly||3') {
      this.isShown = false;
      // let weekValue = parseInt(selectedLaw) * 3;
      // //  console.log(weekValue);
      // let send_date: any = new Date();
      // send_date.setMonth(send_date.getMonth() + weekValue);
    } else {
      this.isShown = true;
    }
    if (this.maximumTime == 'Quarterly||3') {
      var quarterly = this.maximumTime.split('||');
      let weekValue = 3;
      //  console.log(weekValue);
      let send_date: any = new Date();
      send_date.setMonth(send_date.getMonth() + parseInt(quarterly[1]));
      // console.log(send_date);
      debugger;
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.registerDetails.dueDate = setDate;
      }

      // let valCheck = checkbox == "" ? true : false;
      // this.MxLifeTime = event != "" ? event.target.checked : valCheck;
      // console.log(this.MxLifeTimeNumber);

      // if (this.MxLifeTimeNumber) {
      //   this.isShown = !this.isShown;
      // } else {
      //   this.isShown = false;
      // }
    }
  }

  onKeyDate(event: any) {
    let selectedLaw: any = event.target.value;
    if (this.maximumTime == undefined) {
      alert('select the Maximum Lifetime');
      this.registerDetails.MxLifeTimeNumber = '';
    }
    // this.registerDetails.MxLifeTimeNumber = ""
    if (this.maximumTime == 'Week') {
      let weekValue = parseInt(selectedLaw) * 7;
      //  console.log(weekValue);
      let send_date: any = new Date();
      send_date.setDate(send_date.getDate() + weekValue);
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.registerDetails.dueDate = setDate;
      }
    }
    if (this.maximumTime == 'Day') {
      let weekValue = parseInt(selectedLaw) * 1;
      //  console.log(weekValue);
      let send_date: any = new Date();
      send_date.setDate(send_date.getDate() + weekValue);
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.registerDetails.dueDate = setDate;
      }
    }

    if (this.maximumTime == 'Month') {
      let weekValue = parseInt(selectedLaw) * 1;
      //  console.log(weekValue);
      let send_date: any = new Date();
      send_date.setMonth(send_date.getMonth() + weekValue);
      // console.log(send_date);
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.registerDetails.dueDate = setDate;
      }
    }

    if (this.maximumTime == 'Year') {
      let weekValue = parseInt(selectedLaw) * 1;
      //  console.log(weekValue);
      let send_date: any = new Date();
      send_date.setFullYear(send_date.getFullYear() + weekValue);
      // console.log(send_date);
      if (send_date != 'Invalid Date') {
        let setDate: any = this.datePipe.transform(send_date, 'dd-MMM-YYYY');
        //  console.log(setDate);
        this.registerDetails.dueDate = setDate;
      }
    }
  }

  category(event: any, data: any = '') {
    // alert(event.target.value);
    // console.log('data', data);

    let selectedvalue1: any = event != '' ? event.target.value : data;
    // console.log('ddddddddddddddddd', selectedvalue1);

    this.dataservice.categorydetails(selectedvalue1).subscribe((data) => {
      // console.log('typeeee', data);
      this.Type = data.data;
      this.instrument = data.data;
      // console.log(this.Category);
      // this.BackUpdata = data.data;
    });
  }

  typemaster(event: any, data: any = '') {
    // alert(event.target.value);
    let selectedvalue: any = event != '' ? event.target.value : data;
    var shortname = selectedvalue.split('||');

    this.valueof = selectedvalue;
    this.dataservice.typedetails(shortname[0]).subscribe((data) => {
      this.instrument = data.data;

      // this.BackUpdata = data.data;
    });
  }

  public Click_Head(index: number, heading: string): void {
    this.collection = [...this.BackUpdata];
    if (heading == 'Description') {
      this.SearchField = heading;
      this.HighlightHead = index;
    } else {
    }
  }

  public Empty(): void {}
  public onKeySearch(event: any) {}

  public SearchBy(): void {
    // this.searchvalue = this.searchvalue.toUpperCase();
    if (this.searchvalue) {
      if (this.SearchField == 'Description') {
        this.collection = this.collection.filter(
          (f) => f.type == this.searchvalue
        );
      }
    }
  }

  // onFileChanged(event: any, row: number) {
  //   this.image = event.target.files[0];
  //   this.imageArray[row] = this.image;
  //   // this.imageArray[row] = ;
  //   // (<HTMLInputElement>document.getElementById('targetpath'+row)).value = this.image;
  // }

  // downloadMyFile(file: string) {
  //   const link = document.createElement('a');
  //   link.setAttribute('target', '_blank');
  //   link.setAttribute('href', `${environment.filesURL}/${file}`);
  //   // link.setAttribute('download', `products.csv`);
  //   document.body.appendChild(link);
  //   link.click();
  //   link.remove();
  // }

  // getfile(){
  //   this.dataservice.getViewdownload().subscribe(data=>{
  //   let downloadURL = window.URL.createObjectURL(data);
  //   saveAs(downloadURL);
  //   })
  // }

  // private baseUrl = 'http://localhost:4200';
  // // constructor(private http: HttpClient) { }
  // upload(file: File): Observable<HttpEvent<any>> {
  //   const formData: FormData = new FormData();
  //   formData.append('file', file);
  //   const req = new HttpRequest('POST', `${this.baseUrl}/upload`, formData, {
  //     reportProgress: true,
  //     responseType: 'json',
  //   });
  //   return this.http.request(req);
  // }
  // getFiles(): Observable<any> {
  //   return this.http.get(`${this.baseUrl}/files`);
  // }

  // selectFile(event: any): void {
  //   this.selectedFiles = event.target.files;
  // }

  // AddRow() {
  //   alert();
  // }

  AddRow() {
    // this.dataservice = {};
    this.collectiondata.push(this.newDynamic);
    this.toastr.success('New row added successfully', 'New Row');
    // console.log(this.dynamicArray);
    return true;
  }

  delete() {
    this.collectiondata.pop();
    this.toastr.success('New row deleted successfully');
  }

  // selectimage(event: any) {
  //   // debugger;
  //   if (event.target.files.length > 0) {
  //     const files = event.target.files[0];
  //     this.images = files;
  //   }
  // }

  //   fileChange($event) {
  //     this.uploadedFiles = element.target.files;
  // }

  upload() {
    let formData = new FormData();
    // FormData.append('file',this.images);
    for (var i = 0; i < this.uploadedFiles.length; i++) {
      formData.append(
        'uploads[]',
        this.uploadedFiles[i],
        this.uploadedFiles[i].name
      );
    }
    this.http.post('/api/upload', formData).subscribe((response) => {
      console.log('response received is ', response);
    });
  }

  // onsubmit(){
  //   const formData = new FormData();
  //   FormData.append('file',this.images);

  //   this.http.post<any>( 'http://localhost:3000/api/file', FormData).subscribe
  //   (res) => console.log(res),

  //   (err) => console.log(res),

  // }

  onSelectFile(event: any) {
    const files = event.target.files;
    if (files) {
      for (const file of files) {
        const reader = new FileReader();
        reader.onload = (e: any) => {
          if (file.type.indexOf('image') > -1) {
            this.mydata.push({
              url: e.target.result,
              type: 'img',
            });
          } else if (file.type.indexOf('video') > -1) {
            this.mydata.push({
              url: e.target.result,
              type: 'video',
            });
          }
        };
        reader.readAsDataURL(file);
      }
    }
  }
}
