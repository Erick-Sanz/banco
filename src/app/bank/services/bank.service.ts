import { Injectable } from '@angular/core';
import {Cashiers} from './DB-simulation'

export interface CashiersInterface {
    cashierId?:number,
    cashierName?:string,
    totalTransactions?:number | undefined
}

@Injectable({
  providedIn: 'root'
})
export class BankService {
  cashiers=Cashiers
  constructor() { }
  public getTotalClientsServed(){
    let total=0;
    this.cashiers.forEach(c=>{
      total +=c.clients.length
    })
    return total
  }
  public getCashiersInfo(){
    return this.cashiers.map(c=>({cashierId:c.cashierId,name:c.name}))
  }
  public getClientsServedByCashier(cashierId:number){
    const cashierSelect= this.cashiers.find(c=>
      c.cashierId===cashierId
    )
    return cashierSelect?.clients.length || 1
  } 
  public getTotalTransactionsByCashier(cashierId:number){
    let total=0;
    const cashierSelect= this.cashiers.find(c=>
      c.cashierId===cashierId
    )
    cashierSelect?.clients.forEach(c=>{
      total+=c.totalTransactions
    })
    return total
  }
  public getAverageTransactionsBank(){
    let totalClients=0
    let totalTransactions=0
    this.cashiers.forEach(cashier=>{
      totalClients+=cashier.clients.length
      cashier.clients.forEach(client=>{
        totalTransactions+=client.totalTransactions
      })
    })
    return totalTransactions/totalClients
  }
  public getCashierByHighetsNumberTransactions(){
    const cashiers:CashiersInterface[]=[]
    this.cashiers.forEach((cashier,i)=>{
      cashiers[i]={
        cashierId:cashier.cashierId,
        cashierName:cashier.name,
        totalTransactions:0
      }
      cashier.clients.forEach((client,index)=>{
        cashiers[i].totalTransactions += client.totalTransactions
        
      })
    })
    const maxTransactions=Math.max(...cashiers.map(c=>c.totalTransactions))
    const foundCashier=cashiers.find(c=>c.totalTransactions===maxTransactions)
    return foundCashier
  }
  public getCashierByLeastNumberTransactions(){
    const cashiers:CashiersInterface[]=[]
    this.cashiers.forEach((cashier,i)=>{
      cashiers[i]={
        cashierId:cashier.cashierId,
        cashierName:cashier.name,
        totalTransactions:0
      }
      cashier.clients.forEach((client,index)=>{
        cashiers[i].totalTransactions += client.totalTransactions
        
      })
    })
    const maxTransactions=Math.min(...cashiers.map(c=>c.totalTransactions))
    const foundCashier=cashiers.find(c=>c.totalTransactions===maxTransactions)
    return foundCashier
  }
 
}
