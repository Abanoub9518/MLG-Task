import { Component, ElementRef, ViewChild } from "@angular/core";
import { ItemsService } from "../../services/items.service";
import { Item } from "../../models/item.model";
import { CommonModule } from "@angular/common";
import {
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
  Validators,
} from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { DialogModule } from "primeng/dialog";
import { InputTextModule } from "primeng/inputtext";
import { ToastModule } from "primeng/toast";
import { ConfirmationService, MessageService } from "primeng/api";
import { ConfirmPopupModule } from "primeng/confirmpopup";

@Component({
  selector: "app-list-items",
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    ToastModule,
    ConfirmPopupModule,
  ],
  templateUrl: "./list-items.component.html",
  styleUrl: "./list-items.component.scss",
})
export class ListItemsComponent {
  allItems: Item[] = [];
  visible: boolean = false;

  constructor(
    private itemService: ItemsService,
    private formBuilder: FormBuilder,
    private messageService: MessageService,
    private confirmationService: ConfirmationService
  ) {}
  dataKey: string[] = [];
  dataValues: string[] = [];

  addItemForm!: FormGroup;

  ngOnInit(): void {
    this.addItemForm = this.formBuilder.group({
      name: ["", Validators.required],
      year: ["", Validators.required],
      price: ["", Validators.required],
      cpuModel: ["", Validators.required],
      hardSize: ["", Validators.required],
    });
    this.getAllItems();
  }

  getAllItems(): void {
    this.itemService.getAllItems().subscribe((res: Item[]) => {
      this.allItems = res;

      res.forEach((item) => {
        if (item.data) {
          item.dataKey = Object.keys(item.data);
        }
      });
    });
  }

  submit() {
    this.addItemForm.markAllAsTouched();
    console.log("Submit", this.addItemForm.value);
    let addItemObject = {
      name: this.addItemForm.value.name,
      data: {
        year: this.addItemForm.value.year,
        price: this.addItemForm.value.price,
        "CPU model": this.addItemForm.value.cpuModel,
        "Hard disk size": this.addItemForm.value.hardSize,
      },
    };

    this.itemService.addItem(addItemObject).subscribe((res) => {
      if (res.status == 200) {
        this.visible = false;
        console.log(res);
        this.allItems.push({
          id: res.body.id,
          data: res.body.data,
          name: res.body.name,
        });
        this.allItems.forEach((item) => {
          if (item.data) {
            item.dataKey = Object.keys(item.data);
          }
        });
        this.messageService.add({
          severity: "success",
          summary: "Success",
          detail: "Item addedd successfully..",
        });
      }
    });
  }

  showDialog() {
    this.visible = true;
  }
  confirmDelete(event: Event, id: string) {
    this.confirmationService.confirm({
      target: event.target as EventTarget,
      message: "Do you want to delete this record?",
      header: "Delete Confirmation",
      icon: "pi pi-info-circle",
      acceptButtonStyleClass: "p-button-danger p-button-text",
      rejectButtonStyleClass: "p-button-text p-button-text",
      accept: () => {
        this.deleteItem(id);
      },
      reject: () => {
        this.messageService.add({
          severity: "error",
          summary: "Rejected",
          detail: "You have rejected",
        });
      },
    });
  }
  deleteItem(id: string) {
    this.itemService.deleteItem(id).subscribe({
      next: (res) => {
        console.log(res, "sssssssssss");
        if (res.status === 200) {
          this.messageService.add({
            severity: "success",
            summary: "Confirmed",
            detail: "Item deleted successfully",
          });
          this.allItems = this.allItems.filter((item) => item.id !== id);
        } else {
          console.log(res.error.error);
          this.messageService.add({
            severity: res.error.error || "error",
            summary: "Rejected",
            detail: "You have rejected the deletion.",
          });
        }
      },
      error: (err) => {
        const errorMessage = err.error.error;
        console.error(errorMessage);
        this.messageService.add({
          severity: "error",
          summary: "Error",
          detail: errorMessage,
        });
      },
    });
  }
}
