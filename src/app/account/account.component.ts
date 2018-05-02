import { Component, OnInit } from '@angular/core';
import { Http, Jsonp } from '@angular/http';
import {MatButtonModule} from '@angular/material/button';
import {MatDialogModule} from '@angular/material/dialog';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatFormFieldModule} from '@angular/material/form-field';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {

  account: any = {};
  timer: any = false;

  toggle: any = false;

  constructor(private http: Http) { }

  ngOnInit() {
    this.getAccount();
  }

  getAccount() {
    this.http.get('http://localhost:56188/api/account').subscribe(response => {
      this.account = response.json();
    });
  }

  onClickWithdraw() {
    this.toggle = true;
  }

  onClickSubmit(amount) {
    this.timer = true;
    this.http.post('http://localhost:56188/api/account/update', { 'amount': amount }).subscribe(response => {
      this.account = response.json();
    });
    setTimeout(() => {
      this.timer = false;
      this.toggle = false;
    }, 2000);
  }

}
