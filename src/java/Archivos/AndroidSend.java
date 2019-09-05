/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package Archivos;

/**
 *
 * @author macbookpro
 */

import java.io.OutputStream;
import java.net.HttpURLConnection;
import java.net.URL;



public class AndroidSend {
    //private static String SERVER_KEY = "AIzaSyCmwjacOTy8fEGFOTm8JU_zhFNc1IZCTW8";
    private static String SERVER_KEY = "AAAA_TuY7Ac:APA91bH5CDY3xW2kvIqM5agqcqDMeEJ3pf5MHK4tlZPlUbxUKdSlvrlhCXqFPKIoqqcLzd-8ZRq-uVMbS1eSqxufOQYvW-qRVPup_H4ZPAkf0pRY9IAxgOsJLR2mT6lEHnyQfSZZyDYZ";
    private static String DEVICE_TOKEN = "fm-7npi7Wcg:APA91bHlgYuwjYirs-VRjOyOhLMZyBWFfyGuDyAA2kfxd4WB7TkUN5zvXXKTChzDxLMAByR2hrlfrjDcf6fgMiWmKVdWa0z6DMbSKtxTx-qzRE6fUMmsfIn5g-F_1hod8c53IKzkY8nQ";
       // public static void main(String[] args) throws Exception {
       // String title = "My First Notification";
      //  String message = "Hello, I'm push notification";
    //    sendPushNotification(title, message);
   // }
            

    /**
     * Sends notification to mobile, YOU DON'T NEED TO UNDERSTAND THIS METHOD
     */
    public static void sendPushNotification(String title, String message, String DeviceToken) throws Exception {
        String pushMessage = "{\"data\":{\"title\":\"" +
                title +
                "\",\"message\":\"" +
                message +
                "\"},\"to\":\"" +
                DeviceToken +
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
    }
}