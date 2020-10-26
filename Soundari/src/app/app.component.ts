import { Component } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  FormArray,
} from "@angular/forms";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  labForm   : FormGroup;
  rows      : FormArray;
  nameOrder : FormArray;
  sortedName: any;

  constructor(private formBuilder: FormBuilder) {
    this.labForm    = this.formBuilder.group({
    });
    this.rows       = this.formBuilder.array([]);
    this.nameOrder  = this.formBuilder.array([]);
  }

  ngOnInit() {

    this.labForm.addControl("totalRows", this.rows);
    this.labForm.addControl("nameOrder", this.nameOrder);

  }

  newRow(numrow: number) {
    for (var i = 0; i < numrow; i++) {
      this.rows.push(this.createLabListGroup());
    }
  }

  createLabListGroup(): FormGroup {
    return this.formBuilder.group({
      patientName    : "",
      reportTime     : 0
    });
  }

  listOfReports = [
    { ReportName: 'CBC', Time: 1 },
    { ReportName: 'PT', Time: 2 },
    { ReportName: 'HA1', Time: 3 },
    { ReportName: 'BMP', Time: 4 },
    { ReportName: 'LP', Time: 5 }
  ];

  save() {
    for (var i = 0; i < this.rows.length; i++) {
      this.nameOrder.push(this.createListForSorting(this.rows.value[i].patientName, this.rows.value[i].reportTime.reduce((a, b) => a + b, 0)));
    }
    this.sortedName = this.nameOrder.value;
    this.sortedName.sort(function (a, b) {
      if (a.reportTime > b.reportTime) return 1;
      if (a.reportTime < b.reportTime) return -1;
      return 0;
    });

  }

  createListForSorting(name, hours): FormGroup {
    return this.formBuilder.group({
      patientName    : name,
      reportTime     : hours
    });
  }

  reset() {
    this.labForm.reset();
  }

}
