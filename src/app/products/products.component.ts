import { Component, OnInit } from '@angular/core';
import {ProductService} from "../services/product.service";
import {PageProduct, Product} from "../model/product.model";
import {FormBuilder, FormGroup} from "@angular/forms";
import {AuthenticationService} from "../services/authentication.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {

  products! : Array<Product>;
  pageProducts! : PageProduct[];
  currentPage:number=0;
  pageSize:number=5;
  totalPages!:number;
  errorMessages! : string;
  searchFormGroup! : FormGroup;
  modeSearch : string="All";

  constructor(private fb:FormBuilder,private productService:ProductService, public auth : AuthenticationService, private router : Router) { }

  ngOnInit(): void {
    this.searchFormGroup = this.fb.group({
      keyword : this.fb.control(null)
    });
    this.getPageProducts();
  }

  getPageProducts(){
    this.productService.getPageProducts(this.currentPage,this.pageSize).subscribe({
      next: (data) => {
        this.products = data.products;
        this.totalPages=data.totalPages;
        console.log(this.totalPages);
      },
      error: (err) => {
        this.errorMessages = err;
      }
    });
  }

  getAllProducts(){
    this.productService.getAllProducts().subscribe({
      next: (data) => {
        this.products = data;
      },
      error: (err) => {
        this.errorMessages = err;
      }
    });
  }

  OnDeleteProduct(p: Product) {
    let conf = confirm("Are you sure?");
    if(conf==false) return
    this.productService.deleteProduct(p.id).subscribe({
      next : (data)=>{
        //this.getAllProducts();
        let index = this.products.indexOf(p);
        this.products.splice(index,1);
      }
    })
  }

  handleSetPromo(p: Product) {
    let promo = p.promotion;
    this.productService.setPromotion(p.id).subscribe({
      next : (data)=>{
        p.promotion=!promo;
      },
      error : (err)=>{
        this.errorMessages=err;
      }
    });
  }

  handleSearchProducts() {
    this.modeSearch="search";
    let keyword = this.searchFormGroup.value.keyword;
    this.currentPage=0;
    this.productService.SearchProducts(keyword,this.currentPage,this.pageSize).subscribe({
      next: (data)=>{
        this.products=data.products;
        this.totalPages=data.totalPages;

      },error: (err)=>{
        this.errorMessages=err;
      }
    })
  }

  gotoPage(i: number) {
    this.currentPage=i;
    if(this.modeSearch==="All"){
      this.getPageProducts();
    }
    else this.handleSearchProducts();
  }

  handleNewProduct() {
    this.router.navigateByUrl("/admin/new-product");
  }

  handleEditProduct(p: Product) {
    this.router.navigateByUrl("/admin/edit-product/" + p.id);
  }
}
