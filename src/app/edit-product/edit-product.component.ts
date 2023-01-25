import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from "@angular/router";
import {ProductService} from "../services/product.service";
import {Product} from "../model/product.model";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'app-edit-product',
  templateUrl: './edit-product.component.html',
  styleUrls: ['./edit-product.component.css']
})
export class EditProductComponent implements OnInit {

  productId! : string;
  product! : Product;
  productFormGroup! : FormGroup;


  constructor(private fb : FormBuilder, private route : ActivatedRoute, public prodService : ProductService) {
    this.productId = this.route.snapshot.params['id'];
  }

  ngOnInit(): void {
    this.prodService.getProductById(this.productId).subscribe({
      next : (data)=>{
        this.product = data;

        this.productFormGroup=this.fb.group({
          name : this.fb.control(this.product.name,[Validators.required,Validators.minLength(5)]),
          price : this.fb.control(this.product.price,[Validators.required, Validators.min(200)]),
          promotion : this.fb.control(this.product.promotion,[Validators.required])

        });

      },error : (err)=>{
        console.log(err);
      }
    })
  }

  handleUpdateProduct() {
    let product = this.productFormGroup.value;
    product.id=this.productId;
    this.prodService.updateProduct(product).subscribe({
      next : (data)=>{
        alert("Product updated with success");
      },error : (err)=>{
        console.log(err);
      }
    });
  }
}
