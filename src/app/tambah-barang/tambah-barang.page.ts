import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tambah-barang',
  templateUrl: './tambah-barang.page.html',
  styleUrls: ['./tambah-barang.page.scss'],
})
export class TambahBarangPage implements OnInit {
  nama: any;
  keterangan: any;

  constructor(private api: ApiService, private router: Router) {}

  ngOnInit() {}

  onTambahBarang(form: any) {
    const data = {
      nama: this.nama,
      keterangan: this.keterangan,
      status: true,
    };

    console.log(data);

    return this.api.tambahBarang(data).subscribe({
      next: () => {
        this.api.message('Barang akan dibeli');
        this.router.navigateByUrl('/home');
      },
    });
  }

  onCancel() {
    this.router.navigateByUrl('/home');
  }
}
