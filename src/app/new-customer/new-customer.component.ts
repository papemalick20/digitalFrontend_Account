import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Customer } from '../model/customer.model';
import { CustomersService } from '../services/customers.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-new-customer',
  templateUrl: './new-customer.component.html',
  styleUrls: ['./new-customer.component.css']
})
export class NewCustomerComponent {
  newCustomerFormgroup!: FormGroup
  customer!: Observable<Customer>
  constructor(private customerService: CustomersService, private fb: FormBuilder, private router: Router) {

  }

  ngOnInit(): void {
    this.newCustomerFormgroup = this.fb.group({
      name: this.fb.control(null, [Validators.required, Validators.minLength(4)]),
      email: this.fb.control(null, [Validators.required, Validators.email])
    });
  }
  handleSaveCustomer() {
    let customer = this.newCustomerFormgroup.value;
    this.customerService.saveCustomer(customer).subscribe({
      next: data => {
        alert("customer has been saved successfully");
        //this.newCustomerFormgroup.reset();
        this.router.navigateByUrl("/customers");
      },
      error: err => {
        console.log(err);
      }
    });
  }

}
