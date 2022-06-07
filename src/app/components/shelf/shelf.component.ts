import { Component, OnInit } from '@angular/core';
import {StorageService} from "../../services/storage.service";
import {AuthService} from "../../services/auth.service";

@Component({
  selector: 'app-shelf',
  templateUrl: './shelf.component.html',
  styleUrls: ['./shelf.component.scss']
})
export class ShelfComponent implements OnInit {
  constructor(private storage: StorageService, private auth: AuthService) {
  }
  selectedBook:any = null;
  books: any[] | undefined;
  user: any;
  ngOnInit(): void {
    this.auth.user$.subscribe((user: any) => {
      this.user = user;
      if (this.user) {
        const path = `books/${this.user.email}/`;
        this.storage.listAllDocs(path).subscribe((list: any) => {
          this.books = list.items;
        });
      }
    });
  }

  openBook(book: any) {
    this.storage.getBook(book.fullPath).subscribe(url => {
      this.selectedBook = url;
    });

  }

  openSelf() {
    this.selectedBook = null;
  }
}
