import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compilador',
  templateUrl: './compilador.component.html',
  styleUrls: ['./compilador.component.scss']
})
export class CompiladorComponent implements OnInit {

  constructor() { 
    
  }

  ngOnInit() {
    function leerArchivo(e) {
      var archivo = e.target.files[0];
      if (!archivo) {
        return;
      }
      var lector = new FileReader();
      lector.onload = function(e) {
        var contenido = e.target.result;
        var allLines = contenido.split(/\r\n|\n/);
        allLines.forEach((line) =>{
          console.log(line)
        })
        mostrarContenido(contenido);
        
      };
      lector.readAsText(archivo);
      
    }
    
    function mostrarContenido(contenido) {
      //lecturaLineaporLinea(contenido)
      var elemento = document.getElementById('contenido-archivo');
      elemento.innerHTML = contenido;
    }


  function lecturaLineaporLinea(contenido){
    console.log(contenido)

  }

    
    
    document.getElementById('file-input').addEventListener('change', leerArchivo, false);
  }





}
