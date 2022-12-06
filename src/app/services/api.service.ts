import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AlertController } from '@ionic/angular';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(
    public http: HttpClient,
    public alertController: AlertController
  ) {}

  apiURL() {
    return 'http://localhost/apiList/';
  }

  //Daftar barang
  public tambahBarang(data: any): Observable<any> {
    return this.http.post(this.apiURL() + '/tambah.php', data);
  }

  // Melihat list Barang
  public getAllData(link: any): Observable<any> {
    return this.http.get(this.apiURL() + link);
  }

  // Ganti status barang menjadi 0
  public BarangTerbeli(id: any): Observable<any> {
    return this.http.get(this.apiURL() + '/getBarangTerbeli.php?id=' + id);
  }

  // Hapus Barang
  public hapusBarang(id: any): Observable<any> {
    return this.http.get(this.apiURL() + '/deleteList.php?id=' + id);
  }

  public message(message: string) {
    const alert = this.alertController.create({
      message: message,
      buttons: ['OK'],
    });

    alert.then((alert) => {
      alert.present();
    });
  }
}
