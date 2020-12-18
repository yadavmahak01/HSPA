import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {Router} from '@angular/router';
import { TabsetComponent } from 'ngx-bootstrap/tabs';
import { IPropertyBase } from 'src/app/model/ipropertybase';
import { Property } from 'src/app/model/property';
import { AlertifyService } from 'src/app/services/alertify.service';
import { HousingService } from 'src/app/services/housing.service';

@Component({
  selector: 'app-add-property',
  templateUrl: './add-property.component.html',
  styleUrls: ['./add-property.component.css']
})
export class AddPropertyComponent implements OnInit {
//@ViewChild('Form') addProperty:NgForm;
@ViewChild('formTabs') formTabs:TabsetComponent;
addPropertyForm: FormGroup;
nextClicked: boolean;
property=new Property();

//Will come from masters
carTypes:Array<string>=['Sedan','Sports','SUV']
colorTypes:Array<string>=['White','Black','Grey','Red']
cityList:any[];

propertyView:IPropertyBase={
  Id: null,
  Name: '',
  City: '',
  Price: null,
  SellRent: null,
  Type: null,
  Seats: null,
  Color: null
};

  constructor(private fb: FormBuilder,
              private router:Router,
              private housingService:HousingService,
              private alertify:AlertifyService
    ) {}

  ngOnInit() {
    this.CreateAddPropertyForm();
    this.housingService.getAllCities().subscribe(data=>{
      this.cityList=data;
      console.log(data);
    })
  }
CreateAddPropertyForm(){
  this.addPropertyForm = this.fb.group({
      BasicInfo:this.fb.group({
      SellRent: ['1' , Validators.required],
      Seats: [null, Validators.required],
      Name: [null, Validators.required],
      City: [null, Validators.required] ,
      Type: [null, Validators.required],
      Color: [null,Validators.required]
    }),
    PriceInfo:this.fb.group({
      Price: [null, Validators.required],
      Security:[null, Validators.required],
      Maintenance:[null, Validators.required]
    }),
    AddressInfo: this.fb.group({
      Address: [null, Validators.required],
      LandMark: [null],
    }),

    OtherInfo: this.fb.group({
      Description: [null]
    })
    });
}

//#region <Getter Methods>
  // #region <FormGroups>
  get BasicInfo() {
    return this.addPropertyForm.controls.BasicInfo as FormGroup;
  }

  get PriceInfo() {
    return this.addPropertyForm.controls.PriceInfo as FormGroup;
  }

  get AddressInfo() {
    return this.addPropertyForm.controls.AddressInfo as FormGroup;
  }

  get OtherInfo() {
    return this.addPropertyForm.controls.OtherInfo as FormGroup;
  }
// #endregion

//#region <Form Controls>
  get SellRent() {
    return this.BasicInfo.controls.SellRent as FormControl;
  }

  get Seats() {
    return this.BasicInfo.controls.Seats as FormControl;
  }

  get Type() {
    return this.BasicInfo.controls.Type as FormControl;
  }

  get Name() {
    return this.BasicInfo.controls.Name as FormControl;
  }

  get City() {
    return this.BasicInfo.controls.City as FormControl;
  }
  get Color(){
    return this.BasicInfo.controls.Color as FormControl;
  }
  get Price() {
    return this.PriceInfo.controls.Price as FormControl;
  }

  get Security() {
    return this.PriceInfo.controls.Security as FormControl;
  }

  get Maintenance() {
    return this.PriceInfo.controls.Maintenance as FormControl;
  }

  get Address() {
    return this.AddressInfo.controls.Address as FormControl;
  }

  get LandMark() {
    return this.AddressInfo.controls.LandMark as FormControl;
  }

  get Description() {
    return this.OtherInfo.controls.Description as FormControl;
  }

  onBack(){
    this.router.navigate(['/']);
    }
   onSubmit(){
    this.nextClicked=true;
    if(this.allTabsValid()){
    this.mapProperty();
    this.housingService.addProperty(this.property);
    this.alertify.success('Form submitted!');
    console.log(this.addPropertyForm);

    if(this.SellRent.value === '2'){
      this.router.navigate(['/rent-property']);
    }
    else{
      this.router.navigate(['/']);
    }

    }
    else{
      this.alertify.error('Check the form again!');
    }
  }

  mapProperty(): void {
    this.property.Id=this.housingService.newPropID();
    this.property.Id = +this.SellRent.value;
    this.property.SellRent = +this.SellRent.value;
    this.property.Seats = this.Seats.value;
    this.property.Type = this.Type.value;
    this.property.Name = this.Name.value;
    this.property.Color=this.Color.value;
    this.property.City = this.City.value;
    this.property.Price = this.Price.value;
    this.property.Security = this.Security.value;
    this.property.Maintenance = this.Maintenance.value;
    this.property.Address = this.Address.value;
    this.property.Description = this.Description.value;
  }


  allTabsValid():boolean {
    if(this.BasicInfo.invalid){
      this.formTabs.tabs[0].active = true;
      return false;
    }
    if(this.PriceInfo.invalid){
      this.formTabs.tabs[1].active = true;
      return false;
    }
    if(this.AddressInfo.invalid){
      this.formTabs.tabs[2].active = true;
      return false;
    }
    if(this.OtherInfo.invalid){
      this.formTabs.tabs[3].active = true;
      return false;
    }
    return true;
  }
  selectTab(NextTabId: number,IsCurrentTabValid:boolean) {
    this.nextClicked=true;
    if(IsCurrentTabValid){
    this.formTabs.tabs[NextTabId].active = true;
    }
  }
}
