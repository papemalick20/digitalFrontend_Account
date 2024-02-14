import { Component } from '@angular/core';
import { CustomersService } from '../services/customers.service';
import { Observable, catchError, throwError } from 'rxjs';
import { Customer } from '../model/customer.model';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-customers',
  templateUrl: './customers.component.html',
  styleUrls: ['./customers.component.css']
})
export class CustomersComponent {
  customers!: Observable<Array<Customer>>
  errorMessage!: string;
  searchFormGroup!: FormGroup;
  constructor(private customerservice: CustomersService, private fb: FormBuilder) {

  }
  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword: this.fb.control("")
    });
    this.customers = this.customerservice.getCustomer().pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )

  }
  handleSearchCustomer() {
    let kw = this.searchFormGroup?.value.keyword;
    this.customers = this.customerservice.searchCustomers(kw).pipe(
      catchError(err => {
        this.errorMessage = err.message;
        return throwError(err);
      })
    )
  }

  handleDeletecustomer(c: Customer) {
    let conf = confirm("Are you sure");
    if (!conf) return;
    this.customerservice.deleteCustomer(c.id).subscribe({
      next: resp => {
        this.handleSearchCustomer();
      },
      error: err => {
        console.log(err)
      }
    })

  }

}
