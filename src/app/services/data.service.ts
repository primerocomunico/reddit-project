import { Injectable } from '@angular/core';

// Para arreglar youtube links
import { DomSanitizer} from '@angular/platform-browser';

// Service API
import {ApiService} from '../services/api.service';

// Time ago
// npm install javascript-time-ago --save

@Injectable({
  providedIn: 'root'
})
export class DataService {

  sub:any;

  constructor(public _api: ApiService, public _sanitizer: DomSanitizer) {
    // Realizar llamada GET utilizando el servicio _api
    this.sub = this._api.get("https://cors-anywhere.herokuapp.com/https://www.reddit.com/r/mexico/new.json")
      .subscribe((apiResult) => {
        console.log(apiResult);
        this.data = apiResult["data"]["children"];
        // Aquí invocamos a la función al momento de cargar el component
        this.cleanData();
       });
  }

  // Para cerrar el observable
  desuscribirse() {
    this.sub.unsubscribe;
  }

  // Variable que almacenará los datos
  data: object[] = [{}];
  // Variable que almacena los datos ordenados
  dataClean: object[] = [{}];

  cleanData() {
    /*
    Función que nos ayuda a generar un array de objetos más ordenado
    */
    let dataClean = [];

    for (let i = 0; i < this.data.length; i++) {
        let newObj = {
          'title': this.data[i]["data"]["title"],
          'text': this.data[i]["data"]["selftext"],
          'url': this.data[i]["data"]["url"],
          'type': "",
          'subreddit': this.data[i]["data"]["subreddit_name_prefixed"],
          'author': this.data[i]["data"]["author"],
          'timestamp': this.data[i]["data"]["created"],
          'subscribers': this.data[i]["data"]["subreddit_subscribers"]
        }
        // Sirve para asignar un tipo a través de una valoración indexOf
        newObj.type = (newObj.url.indexOf('you') != -1 ? "video" : (newObj.url.indexOf("i.redd.it") != -1 ? "image" : "post"))
        dataClean.push(newObj);
    }
    console.log(dataClean);
    // Asignamos el valor a this.dataClean para poder acceder a ella de manera global
    this.dataClean = dataClean;
  }

  transform(url: string) {
    // Función que utiliza el servicio _sanitizer para hacer un url segura
    return this._sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  timeSince(date: number): string {
    // Funcion para crear la fecha time ago
    if (typeof date === "string"){
      var dateNumber: number = parseInt(date);
    } else {
      dateNumber = date;
    }
  //var ahorita: number = new Date().getTime();
  var ahorita = Math.floor(Date.now() / 1000); // sec
  var timestamp: number = new Date(dateNumber).getTime() - 28800; // restar hora local en este caso 8 horas por ser méxico

  var seconds: number = Math.floor(ahorita - timestamp);
  var interval: number = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + " years ago";
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + " months ago";
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + " days ago";
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + " hours ago";
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + " minutes ago";
  }
  if (ahorita - timestamp < 0)
    return "Just now"
  else
    return "Just now";
}

}
