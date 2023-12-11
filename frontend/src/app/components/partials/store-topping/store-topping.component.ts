import { Component, Input, OnInit } from '@angular/core';
import { ToppingService } from 'src/app/services/topping.service';
import { Store } from 'src/app/shared/models/store';
import { Topping } from 'src/app/shared/models/topping';

@Component({
  selector: 'app-store-topping',
  templateUrl: './store-topping.component.html',
  styleUrls: ['./store-topping.component.css']
})
export class StoreToppingComponent implements OnInit {

  @Input() store!:Store

  topping!:Topping;
  itemTopping:any[]=[]
  selectedRow: number | null = null;
  addNewTopping = false;
  modifyTopping=false;

  inputToppingName!:string
  inputToppingPrice!:number
  inputToppingPicture!:string

  modifyToppingId!:string
  modifyToppingName!:string
  modifyToppingPrice!:number
  modifyToppingPicture!:string

  urllink:string="assets/Images/default.png"
  urllinkk:string="assets/Images/"
  
  
  
  
  
  constructor(private toppingService:ToppingService){

  }

  ngOnInit(): void {
      this.toppingService.getToppingbyIDStore(this.store._id).subscribe((topping)=>{
        this.topping=topping[0];
        this.itemTopping=topping[0].Topping
       
      })
  }
  submitTopping(){
   

    this.toppingService.postNewTopping({
      IdStore:this.store._id,
      tentopping:this.inputToppingName,
      gia:this.inputToppingPrice,
      hinh:this.inputToppingPicture

    }).subscribe((topping)=>{
      this.reloadToppingList();
    })
    this.addNewTopping = false;
   
  }


  updateTopping(){
    this.toppingService.patchUpdateTopping({
      IdStore:this.store._id,
      idtopping:this.modifyToppingId,
      tentopping:this.modifyToppingName,
      gia:this.modifyToppingPrice,
      hinh:this.modifyToppingPicture
    }).subscribe((topping)=>{

      this.reloadToppingList();
    })
    this.modifyTopping = false;
  }


  deleteTopping(){
    this.toppingService.deleteToppingID(
      {
        IdStore:this.store._id,
        idtopping:this.modifyToppingId
      }
    ).subscribe((topping)=>{
      this.reloadToppingList();
    })
    this.modifyTopping = false;
  }

  reloadToppingList() {
    this.toppingService.getToppingbyIDStore(this.store._id).subscribe((topping)=>{
      this.topping=topping[0];
      this.itemTopping=topping[0].Topping
     
    })
  }
  
  handleFileInput(event: any) {
    const url = "assets/Images/";
    const files = event.target.files;
    if (files && files.length > 0) {
      const hinh = files[0].name;
      this.urllink = url + hinh;
      this.urllinkk=url+hinh;
      this.inputToppingPicture = hinh;
      this.modifyToppingPicture=hinh;
    }
  }
  

  countAllTopping(): number {
    return this.itemTopping.length;
  }


  modifyTopping_id(idTopping:string){
    const url = "assets/Images/";
    this.modifyTopping = true;
    this.toppingService.getToppingID({IdStore:this.store._id,idtopping:idTopping}).subscribe((topping)=>{
      this.modifyToppingId=topping._id
     this.modifyToppingName=topping.tentopping
     this.modifyToppingPrice=topping.gia
     this.urllinkk=url+topping.hinh
      
      this.reloadToppingList()

    })
  }
  closeAlert_AddTopping(){
    this.addNewTopping = false;
    this.inputToppingName=""
    this.inputToppingPicture="assets/Images/default.png"
    this.inputToppingPrice=0
  }

  closeAlert_ModifyTopping(){
    this.modifyTopping = false;
   
  }



}
