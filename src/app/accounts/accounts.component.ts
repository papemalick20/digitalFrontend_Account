import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { Observable } from 'rxjs';
import { AccountDetails } from '../model/account.model';

@Component({
  selector: 'app-accounts',
  templateUrl: './accounts.component.html',
  styleUrls: ['./accounts.component.css']
})
export class AccountsComponent {
  accountFormgroup!: FormGroup;
  currentPage: number = 0;
  sizePage: number = 5;
  accountObservable!: Observable<AccountDetails>;
  constructor(private fb: FormBuilder, private accountService: AccountsService) { }

  ngOnInit(): void {
    this.accountFormgroup = this.fb.group({
      accountId: this.fb.control("")
    })
  }

  handleSearchAcount() {
    let accountId: string = this.accountFormgroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.sizePage);

  }
}
