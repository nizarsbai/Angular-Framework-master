export interface Product{
  //id : number;
  id:string;
  name : string;
  price : number;
  promotion : boolean;
}

export class PageProduct{
  products! : Product[];
  page! : number;
  size! : number;
  totalPages! : number;
}
