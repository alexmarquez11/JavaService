/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Archivos;

import com.notnoop.apns.APNS;
import com.notnoop.apns.ApnsService;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.OutputStream;
import java.io.Reader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.URL;
import java.nio.charset.Charset;
import javax.jws.WebService;
import javax.jws.WebMethod;
import javax.jws.WebParam;
import javax.ejb.Stateless;
import javax.servlet.ServletContext;

import org.json.JSONArray;

import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author macbookpro
 */
@WebService(serviceName = "SendNotification")
@Stateless()
public class SendNotification {
    
    private static String PATH_TO_P12_CERT = "/WEB-INF/Certificados/CertificadosIonic.p12";
    private static String CERT_PASSWORD = "Seguridad45$";
    private static String SERVER_KEY = "AAAA_TuY7Ac:APA91bH5CDY3xW2kvIqM5agqcqDMeEJ3pf5MHK4tlZPlUbxUKdSlvrlhCXqFPKIoqqcLzd-8ZRq-uVMbS1eSqxufOQYvW-qRVPup_H4ZPAkf0pRY9IAxgOsJLR2mT6lEHnyQfSZZyDYZ";

    
    /**
     * This is a sample web service operation
     */
    @WebMethod(operationName = "hello")
    public String hello(@WebParam(name = "name") String txt) {
        return "Hello " + txt + " !";
    }

    /**
     * Web service operation
     */
    @WebMethod(operationName = "RecibirMensaje")
    public String RecibirMensaje(@WebParam(name = "Mensaje") String Mensaje, @WebParam(name = "Dispositivo") int Dispositivo) throws IOException, JSONException {
        //TODO write your implementation code here:
        AndroidSend androidsend = new AndroidSend();
        
        String valorMensaje = Mensaje;
        int valorDispositivo = Dispositivo;
        
        if(valorDispositivo == 1)
        {
            JSONArray json = readJsonFromUrl("https://apex.oracle.com/pls/apex/desarrolloappls/oracle.prueba.gt/tokens", valorMensaje, valorDispositivo);
        }
        else{
            
           JSONArray json = readJsonFromUrl("https://apex.oracle.com/pls/apex/desarrolloappls/oracle.prueba.gt/tokensA", valorMensaje, valorDispositivo);

            
        }
        

        System.out.println(valorMensaje);
        
        return valorMensaje;
    }
    
    /*
    Envio de Notificaciones Push a Dispositivos   iOS
    */
    
     public static String EnvioNotificaciones(String token, String MensajeNotificacion){
         
      ApnsService service =
                APNS.newService()
                        .withCert(PATH_TO_P12_CERT, CERT_PASSWORD)
                        .withSandboxDestination()
                         // .withSocksProxy("http://proxybc_c.banguat.net.gt:", 80)
                        // .withProxy(proxy)
                        .build();
         
          String payload = APNS.newPayload()
                .alertBody(MensajeNotificacion)
                .sound("default")
                .build();
          
          
          service.push(token, payload);
          System.out.println("The message has been hopefully sent...");
      return "";
  }
     
     
    /*
    Envio de Notificaciones Push a Dispositivos Android 
    */
     
     public static String EnvioNotificacionesAndroid(String token, String MensajeNotificacion) throws MalformedURLException, IOException{
          String pushMessage = "{\"data\":{\"title\":\"" +
                "Banco de Guatemala" +
                "\",\"message\":\"" +
                MensajeNotificacion +
                "\"},\"to\":\"" +
                token +
                "\"}";
        // Create connection to send FCM Message request.
        URL url = new URL("https://fcm.googleapis.com/fcm/send");
        HttpURLConnection conn = (HttpURLConnection) url.openConnection();
        conn.setRequestProperty("Authorization", "key=" + SERVER_KEY);
        conn.setRequestProperty("Content-Type", "application/json");
        conn.setRequestMethod("POST");
        conn.setDoOutput(true);

        // Send FCM message content.
        OutputStream outputStream = conn.getOutputStream();
        outputStream.write(pushMessage.getBytes());

        System.out.println(conn.getResponseCode());
        System.out.println(conn.getResponseMessage());
         
         return "";
     }
     
     private static String readAll(Reader rd) throws IOException {
    StringBuilder sb = new StringBuilder();
    int cp;
    while ((cp = rd.read()) != -1) {
      sb.append((char) cp);
    }
    return sb.toString();
  }
     
     
     
     public static JSONArray readJsonFromUrl(String url, String Mensaje, int dispositivo) throws IOException, JSONException {
    InputStream is = new URL(url).openStream();
    try {
      BufferedReader rd = new BufferedReader(new InputStreamReader(is, Charset.forName("UTF-8")));
      String jsonText = readAll(rd);
      JSONObject json = new JSONObject(jsonText);
      JSONArray items = json.optJSONArray("items");
      
      if(dispositivo == 1){
          
      
      
      int numero  = items.length();
      
      for(int x=0; numero > x ;)
      {
          JSONObject archivos = items.getJSONObject(x);
          String valor1 = archivos.getString("token");
          System.out.println(valor1);
          String envio = EnvioNotificaciones(valor1, Mensaje);
            x++;
      }
      
        }
      else if(dispositivo ==2)
      {
          int numero  = items.length();
      
                for(int x=0; numero > x ;)
                {
                    JSONObject archivos = items.getJSONObject(x);
                    String valor1 = archivos.getString("token");
                    System.out.println(valor1);
                    String envio = EnvioNotificacionesAndroid(valor1, Mensaje);
                      x++;
                }

      }
      

      return items;
    } finally {
      is.close();
    }
  }
    
}


