import { Component,OnInit } from '@angular/core';
import { BankService, CashiersInterface } from '../../services/bank.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalClientsServed=0;
  totalTransactionsCashier=0;
  averageTrasactionCashier=0.0;
  averageTrasactionBanck=0.0;
  cashierHighetsTransactions:CashiersInterface;
  cashierLeastTransactions:CashiersInterface;
  totalClientsCashier:number=0;
  cashiersInfo:any;
  cashierIdSelect!:number;
  constructor(private bankServie:BankService) {
  }
  ngOnInit(): void {
    this.cashiersInfo=this.bankServie.getCashiersInfo()
  }
  public getTotalClientsServed(){
    this.totalClientsServed=this.bankServie.getTotalClientsServed()
  }
  public onSelectCashier(){
    this.totalClientsCashier=this.bankServie.getClientsServedByCashier(this.cashierIdSelect)
    this.totalTransactionsCashier=this.bankServie.getTotalTransactionsByCashier(this.cashierIdSelect)
    this.averageTrasactionCashier=this.totalClientsCashier/this.totalTransactionsCashier
  }
  public getAverageTransactionsBank(){
    this.averageTrasactionBanck=this.bankServie.getAverageTransactionsBank()
  }
  public getCashierByHighetsNumberTransactions(){
    this.cashierHighetsTransactions=this.bankServie.getCashierByHighetsNumberTransactions()
  }
   public getCashierByLeastNumberTransactions(){
    this.cashierLeastTransactions=this.bankServie.getCashierByLeastNumberTransactions()
  }
}
