import { Component, OnInit, ViewContainerRef, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterDataService } from '../../services/master-data.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Place } from '../../models/place';

declare var $: any;

@Component({
  selector: 'app-places',
  templateUrl: './places.component.html',
  styles: []
})
export class PlacesComponent implements OnInit {

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  units: number = 0;
  resultsLength = 0;
  isEdit: boolean = false;
  delId: string;
  displayedColumns: string[] = ['name', 'pincode', 'actions'];
  data: Place;
  dataset: Array<Place>;
  dataSource: MatTableDataSource<Place>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private vcr: ViewContainerRef, private toastr: ToastrService, private ngZone: NgZone,
    private masterDataService: MasterDataService) {
    // Get dataset
    this.getDataset();
  }

  nameFormControl = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  pincodeFormControl = new FormControl('', [Validators.required, Validators.maxLength(6)]);

  ngOnInit() {
    this.data = new Place();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  getDataset() {
    this.isEdit = false;
    this.masterDataService.getPlaces().subscribe((resp) => {
      if (resp.status == 200) {
        this.dataset = new Array<Place>();
        this.dataset = resp.json();
        this.resultsLength = this.dataset.length;
        // Assign the data to the data source for the table to render
        this.dataSource = new MatTableDataSource(this.dataset);
      }
    });
  }

  resetForm() {
    this.isEdit = false;
  }

  saveData() {
    if (!this.isEdit) {
      this.masterDataService.createPlace(this.data).subscribe((resp) => {
        if (resp.status == 200) {
          this.getDataset();
          this.toastr.success("Details saved successfully");
          $("#btnCancel").click();
        }
        else {
          this.toastr.error("Something went wrong!");
          $("#btnCancel").click();
        }
      });
    }
    else {
      this.masterDataService.updatePlace(this.data).subscribe((resp) => {
        if (resp.status == 200) {
          this.getDataset();
          this.toastr.success("Details updated successfully");
          $("#btnCancel").click();
        }
        else {
          this.toastr.error("Something went wrong!");
          $("#btnCancel").click();
        }
      });
    }
  }

  editData(id: string) {
    this.masterDataService.getPlace(id).subscribe((resp) => {
      if (resp.status == 200) {
        this.isEdit = true;
        this.data = null;
        this.data = new Place();
        this.data = resp.json();
        $("#btnEdit").click();
      }
      else {
        this.toastr.error("Data fetch failed");
      }
    });
  }

  deleteDataConfirmation(id: string) {
    this.delId = id;
    $('#btnDeleteConfirmModal').click();
  }

  deleteData(id: string) {
    let payloadData = {"place_id": id};
    this.masterDataService.deletePlace(payloadData).subscribe((resp) => {
      if (resp.status == 200) {
        this.toastr.success("Data is deactivated");
        this.getDataset();
        $("#btnDeleteCancel").click();
      }
      else {
        this.toastr.error("Data deletion failed");
        $("#btnDeleteCancel").click();
      }
    });
  }

  omitSpecialChar(event) {
    var k;
    k = event.charCode;  // k = event.keyCode; (Both can be used)
    return ((k > 64 && k < 91) || (k > 96 && k < 123) || k == 8 || k == 32 || (k >= 48 && k <= 57));
  }

  triggerResize() {
    // Wait for changes to be applied, then trigger textarea resize.
    this.ngZone.onStable.pipe(take(1))
      .subscribe(() => this.autosize.resizeToFitContent(true));
  }

}
