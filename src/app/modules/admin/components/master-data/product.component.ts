import { Component, OnInit, ViewContainerRef, NgZone, ViewChild } from '@angular/core';
import { CdkTextareaAutosize } from '@angular/cdk/text-field';
import { FormControl, Validators } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MasterDataService } from '../../services/master-data.service';
import { ToastrService } from 'ngx-toastr';
import { take } from 'rxjs/operators';
import { Product } from '../../models/product';

declare var $: any;

/** Constants used to fill up our data base. */
const COLORS: string[] = [
  'maroon', 'red', 'orange', 'yellow', 'olive', 'green', 'purple', 'fuchsia', 'lime', 'teal',
  'aqua', 'blue', 'navy', 'black', 'gray'
];
const NAMES: string[] = [
  'Maia', 'Asher', 'Olivia', 'Atticus', 'Amelia', 'Jack', 'Charlotte', 'Theodore', 'Isla', 'Oliver',
  'Isabella', 'Jasper', 'Cora', 'Levi', 'Violet', 'Arthur', 'Mia', 'Thomas', 'Elizabeth'
];

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [
  ]
})
export class ProductComponent implements OnInit {

  @ViewChild('autosize', { static: false }) autosize: CdkTextareaAutosize;
  units: number = 0;
  resultsLength = 0;
  isEdit: boolean = false;
  delId: string;
  displayedColumns: string[] = ['name', 'product_type_name', 'price', 'units', 'actions'];
  data: Product;
  dataset: Array<Product>;
  dataSource: MatTableDataSource<Product>;

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  constructor(private vcr: ViewContainerRef, private toastr: ToastrService, private ngZone: NgZone,
    private masterDataService: MasterDataService) {
    // Get products
    this.getDataset();
  }

  nameFormControl = new FormControl('', [Validators.required, Validators.maxLength(50)]);
  descFormControl = new FormControl('', [Validators.required, Validators.maxLength(250)]);
  priceFormControl = new FormControl('', [Validators.required]);
  unitsFormControl = new FormControl('', [Validators.required]);
  productTypeFormControl = new FormControl('', [Validators.required]);

  ngOnInit() {
    this.data = new Product();
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
    this.masterDataService.getProducts().subscribe((resp) => {
      if (resp.status == 200) {
        this.dataset = new Array<Product>();
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
    let unit = (+this.data.units);
    if (unit < 0) {
      this.data.units = 0;
    }
    if (!this.isEdit) {
      this.masterDataService.createProduct(this.data).subscribe((resp) => {
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
      this.masterDataService.updateProduct(this.data).subscribe((resp) => {
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
    this.masterDataService.getProduct(id).subscribe((resp) => {
      if (resp.status == 200) {
        this.isEdit = true;
        this.data = null;
        this.data = new Product();
        this.data = resp.json();
        $("#btnEdit").click();
      }
      else {
        this.toastr.error("Product fetch failed");
      }
    });
  }

  deleteDataConfirmation(productId: string) {
    this.delId = productId;
    $('#btnDeleteConfirmModal').click();
  }

  deleteData(productId: string) {
    let data = {"product_id": productId};
    this.masterDataService.deleteProduct(data).subscribe((resp) => {
      if (resp.status == 200) {
        this.toastr.success("Product is deactivated");
        this.getDataset();
        $("#btnDeleteCancel").click();
      }
      else {
        this.toastr.error("Product deletion failed");
        $("#btnDeleteCancel").click();
      }
    });
  }

  increaseUnit() {
    let unit = (+this.data.units);
    if (unit < 100) {
      this.data.units = unit + 1;
    }
  }

  decreaseUnit() {
    let unit = (+this.data.units);
    if (unit == 0) {
      return;
    }
    else if (unit > 0) {
      this.data.units = unit - 1;
    }
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
