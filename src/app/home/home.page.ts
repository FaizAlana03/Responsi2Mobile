import { Component } from '@angular/core';
import { AuthenticationService } from '../services/authentication.service';
import { Router } from '@angular/router';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nama: any; //init variable nama untuk namauser
  token: any;
  BeliBarang: any = [];
  BarangTerbeli: any = [];

  constructor(
    private authService: AuthenticationService,
    private router: Router,
    private api: ApiService
  ) {}

  ngOnInit() {
    this.loadToken();
    this.getBeliBarang();
    this.getBarangTerbeli();
  }

  //cek sesi untuk mengambil nama user
  loadToken() {
    this.token = this.authService.getData('token');
    if (this.token != null) {
      this.nama = this.authService.getData('username');
    } else {
      this.router.navigateByUrl('/login');
    }
  }

  logout() {
    this.authService.logout();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  tambahBarang() {
    this.router.navigateByUrl('/tambah-barang');
  }

  editBarang(id: any) {
    return this.api.BarangTerbeli(id).subscribe({
      next: () => {
        this.api.message('Barang sudah dibeli');
        this.router.navigateByUrl('/home');
      },
    });
  }

  getBeliBarang() {
    this.api.getAllData('/getBeliBarang.php').subscribe((data) => {
      return (this.BeliBarang = data);
    });
  }

  getBarangTerbeli() {
    this.api.getAllData('/getBarangTerbeli.php').subscribe((data) => {
      return (this.BarangTerbeli = data);
    });
  }

  deleteList(id: any) {
    return this.api.hapusBarang(id).subscribe({
      next: () => {
        this.api.message('Barang telah terbeli');
        this.router.navigateByUrl('/home');
      },
    });
  }
}
