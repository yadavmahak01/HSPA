import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-property-detail',
  templateUrl: './property-detail.component.html',
  styleUrls: ['./property-detail.component.scss']
})
export class PropertyDetailComponent implements OnInit {
public propertyId:number;
  constructor(private route:ActivatedRoute, private router:Router) { }

  ngOnInit() {
    this.propertyId = +this.route.snapshot.params['id'];//+ converted the string to number
    //will be executed when the params value is changed in the route in same component
    this.route.params.subscribe(
      (params) => {
        this.propertyId = +params['id'];
      }
    );
  }

  onSelectNext(){
     this.propertyId +=1;
     this.router.navigate(['property-detail',this.propertyId]);
     //for relative path
     //this.router.navigate(['property-detail',this.propertyId],{ relativeTo:this.route });

  }

}
