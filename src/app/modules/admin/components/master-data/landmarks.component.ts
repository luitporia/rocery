import { Component, OnInit, ViewContainerRef, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterDataService } from '../../services/master-data.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Locality } from '../../models/locality';
import { Landmark } from '../../models/landmark';

declare var $: any;

@Component({
  selector: 'app-landmarks',
  templateUrl: './landmarks.component.html',
  styles: []
})
export class LandmarksComponent implements OnInit {

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  units: number = 0;
  resultsLength = 0;
  isEdit: boolean = false;
  delId: string;
  localities: Locality[];
  displayedColumns: string[] = ['name', 'locality_name', 'actions'];
  data: Landmark;
  dataset: Array<Landmark>;
  dataSource: MatTableDataSource<Landmark>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private vcr: ViewContainerRef, private toastr: ToastrService, private ngZone: NgZone,
    private masterDataService: MasterDataService) {
    // Get dataset
    this.getDataset();
    this.getLocalities();
  }

  nameFormControl = new FormControl('', [Validators.required, Validators.maxLength(100)]);
  localityFormControl = new FormControl('', [Validators.required]);

  ngOnInit() {
    this.data = new Landmark();
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

  getLocalities() {
    this.masterDataService.getLocalities().subscribe((resp) => {
        if (resp.status == 200) {
          this.localities = [];
          this.localities = resp.json();
        }
    });
  }

  getDataset() {
    this.isEdit = false;
    this.masterDataService.getLandmarks().subscribe((resp) => {
      if (resp.status == 200) {
        this.dataset = new Array<Landmark>();
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
      this.masterDataService.createLandmark(this.data).subscribe((resp) => {
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
      this.masterDataService.updateLandmark(this.data).subscribe((resp) => {
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
    this.masterDataService.getLandmark(id).subscribe((resp) => {
      if (resp.status == 200) {
        this.isEdit = true;
        this.data = null;
        this.data = new Landmark();
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
    let payloadData = {"landmark_id": id};
    this.masterDataService.deleteLandmark(payloadData).subscribe((resp) => {
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
