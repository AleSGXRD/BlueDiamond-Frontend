import { Client } from "./client";
import { Service } from "./service";

export interface Estimate{

    estimateId:number;
    clientId:number;
    itemId:number;
    serviceId: number;

    itemName:string;
    estimateDate:Date;
    estimateApproved?:boolean;
    discount?:number;
    quantity:number;
    price?:number;

    client?:Client;
    service?:Service;
}
