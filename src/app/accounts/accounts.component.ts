import { Component } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { AccountsService } from '../services/accounts.service';
import { Observable } from 'rxjs';
import { AccountDetails } from '../model/account.model';
import { AuthService } from '../services/auth.service';

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
  operationFormfroup!: FormGroup
  constructor(private fb: FormBuilder, private accountService: AccountsService, public authService: AuthService) { }

  ngOnInit(): void {
    this.accountFormgroup = this.fb.group({
      accountId: this.fb.control("")

    });
    this.operationFormfroup = this.fb.group({
      operationType: this.fb.control(""),
      amount: this.fb.control(0),
      description: this.fb.control(""),
      accountdestination: this.fb.control(""),
      accountId: this.fb.control("")
    })
  }

  handleSearchAcount() {
    let accountId: string = this.accountFormgroup.value.accountId;
    this.accountObservable = this.accountService.getAccount(accountId, this.currentPage, this.sizePage);
    //this.accountFormgroup.reset('')

  }
  gotoPage(page: number) {
    this.currentPage = page;
    this.handleSearchAcount();
  }

  handleAccountOperation() {
    let accountId: string = this.accountFormgroup.value.accountId;
    let operationType = this.operationFormfroup.value.operationType;
    let amount: number = this.operationFormfroup.value.amount;
    let description: string = this.operationFormfroup.value.description;
    let accountdestination: string = this.operationFormfroup.value.accountdestination;
    if (operationType == 'DEBIT') {
      this.accountService.debit(accountId, amount, description).subscribe({
        next: (data) => {
          alert('success debit')
          this.operationFormfroup.reset();
          this.handleSearchAcount()
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
    else if (operationType == 'CREDIT') {
      this.accountService.credit(accountId, amount, description).subscribe({
        next: (data) => {
          alert('success credit')
          this.operationFormfroup.reset();
          this.handleSearchAcount()
        },
        error: (err) => {
          console.log(err)
        }
      });
    }
    else if (operationType == 'TRANSFERT') {
      this.accountService.transfert(accountId, amount, accountdestination).subscribe({
        next: (data) => {
          alert('success tranfert')
          this.operationFormfroup.reset();
          this.handleSearchAcount()
        },
        error: (err) => {
          console.log(err)
        }
      });
    }

  }
}
