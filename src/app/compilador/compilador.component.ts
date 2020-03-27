import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-compilador',
  templateUrl: './compilador.component.html',
  styleUrls: ['./compilador.component.scss']
})
export class CompiladorComponent implements OnInit {


  objetos_terminales: any;
  objetos_noterminales: any;


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
       var contenido = lector.result
        // var contenido = e.target.result;
        //VARIABLES CONSTANTES
        var allLines = contenido.toString().split(/\r\n|\n/);
        const OBJ_VARIABLES = [];
        const OB_TERMINALES = [];
        var prueba_ch : any ;
        var preuba_ter: any;
        var bandera : boolean;
        bandera = true;
        allLines.forEach((line) =>{
          var filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890';//Caracteres validos

       
          //Validamos linea por linea para saber si tiene Variables
          var miPalabra = line;
          var inde = miPalabra.indexOf(":",0)
          //console.log(inde)
          if(inde != -1)
          {
            //si tiene variables se extrae e inserta en una variable
            var cade_primera = miPalabra.substr(0,inde)

            //se crea el objeto
            var obje_cre = new Object();
            obje_cre["COD"] = 1;
            obje_cre["VALOR"] = cade_primera;

            prueba_ch = obje_cre;
            if(bandera)
            {
              OBJ_VARIABLES.push(prueba_ch)
              bandera = false;
            }
            else
            {
              //SE VALIDA QUE VARIABLE YA NO ESTE INSERTADAS
              var inserb : boolean;
                    for(var i=0 ; i < OBJ_VARIABLES.length; i++) 
                  {
                    if(OBJ_VARIABLES[i].VALOR != prueba_ch.VALOR)
                    {
                      inserb = false
                      //OBJ_VARIABLES.splice(i,1);
                      //console.log(OBJ_VARIABLES)
                    }
                    else
                    {
                      inserb = true;
                    }
                    
                  }

              if(!inserb)
              {
                OBJ_VARIABLES.push(prueba_ch) 
              }
            

            }

            
             //console.log(OBJ_VARIABLES)
            // console.log(obje_cre)
          }
          var cadena_seg = miPalabra.substr(inde +1 ,miPalabra.length)

          var cadena_ter = cadena_seg.replace(cade_primera,'')
           //console.log(cadena_ter)
          //  SE VALIDA EL RESTO DE LA CADENA
          for(var index = 0; index < cadena_ter.length; index++)
          {
              var letraActual = cadena_ter.charAt(index);
              // console.log(letraActual.length)
           //var segunda =   letraActual.replace("[^a-zA-Z0-9]", " "); 
                    for (var i=0; i<letraActual.length; i++)
                    {
                      if (filtro.indexOf(letraActual.charAt(i)) != -1)
                      {
                        var  out = letraActual.charAt(i);
                          if(esMayuscula(out))
                            {

                                //console.log("La letra " + out + " es mayúscula");

                                                var obje_cre = new Object();
                                                obje_cre["COD"] = 1;
                                                obje_cre["VALOR"] = out;

                                                prueba_ch = obje_cre;

                                              var inserb : boolean;
                                                for(var i=0 ; i < OBJ_VARIABLES.length; i++) 
                                              {
                                                if(OBJ_VARIABLES[i].VALOR != prueba_ch.VALOR)
                                                {
                                                  //inserb = false
                                                  //OBJ_VARIABLES.splice(i,1);
                                                  //console.log(OBJ_VARIABLES)
                                                }
                                                else
                                                {
                                                  inserb = false;
                                                }
                                                
                                              }

                                          // if(!inserb)
                                          // {
                                          //   //console.log("si pasa por aca")
                                          //   OBJ_VARIABLES.push(prueba_ch) 
                                          // }

                                          // console.log(OBJ_VARIABLES)
                            }
                            
                            if(esMinuscula(out))
                            {
                              // if(OB_TERMINALES.length == 0)
                              // {
                              //   console.log("objeto vacio")

                              // }
                              // else
                              // {
                              //   console.log(OB_TERMINALES)
                              //   console.log("La letra " + out + " es minúscula");
                              // }

                              if(out == "e")
                              {
                                // alert("Se encuenta una letra " + out)
                              }
                              else
                              {
                                var obje_cre = new Object();
                               obje_cre["COD"] = 1;
                               obje_cre["VALOR"] = out;

                               preuba_ter = obje_cre;

                               if(OB_TERMINALES.length == 0)
                               {
                                 OB_TERMINALES.push(preuba_ter)
                               }
                               else
                               {
                                 var bandera_termi : boolean;
                                 bandera_termi = true;
                                    for(var i=0 ; i < OB_TERMINALES.length; i++) 
                                    {
                                      if(OB_TERMINALES[i].VALOR == preuba_ter.VALOR)
                                      {
                                        bandera_termi = true;
                                        //console.log("se encontro la letra " + preuba_ter.VALOR)
                                        break;
                                        //inserb = false
                                        //OBJ_VARIABLES.splice(i,1);
                                        //console.log(OBJ_VARIABLES)
                                      }
                                      else
                                      {
                                        bandera_termi = false
                                      }
                                     
                                      
                                    }
                                    // console.log(bandera_termi)
                                    if(bandera_termi == false )
                                    {
                                      OB_TERMINALES.push(preuba_ter)
                                    }
                               }
                              }

                              

                                
                            }    
                       //console.log(out)

                       


                                             } 
                       
                    }
                  

            
          }
          
         // console.log(line)

         
        })
        mostrarContenido(contenido);
        var foo = OBJ_VARIABLES.map(function(bar){
          return '<li>'+bar.VALOR+'</li>'
          
        })
        
         document.getElementById("foo").innerHTML = JSON.stringify(foo)

         var fooo = OB_TERMINALES.map(function(bar){
          return '<li>'+bar.VALOR+'</li>'
          
        })
        
         document.getElementById("fooo").innerHTML = JSON.stringify(fooo)

      };
      lector.readAsText(archivo);
      
    }

    function NumText(string){//solo letras y numeros
      var out = '';
      //Se añaden las letras validas
      var filtro = 'abcdefghijklmnñopqrstuvwxyzABCDEFGHIJKLMNÑOPQRSTUVWXYZ1234567890';//Caracteres validos
    
      for (var i=0; i<string.length; i++)
         if (filtro.indexOf(string.charAt(i)) != -1) 
         out += string.charAt(i);
      return out;
  }

                function esMayuscula(letra)
            {
              
                return letra === letra.toUpperCase();
            }

            function esMinuscula(letra)
            {
                return letra === letra.toLowerCase();
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
