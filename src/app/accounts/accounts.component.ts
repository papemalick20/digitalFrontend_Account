import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  accountFomgroup!: FormGroup
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.accountFomgroup = this.fb.group({
      accountId: this.fb.control("")
    })
  }

  handleSearchAcount() {

  }
}
