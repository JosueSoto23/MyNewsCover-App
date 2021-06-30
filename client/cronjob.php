<?php
require 'logica/conexion.php';


   $conns = getConnection();
   $cons = "SELECT * FROM newssources";
   $querys = mysqli_query($conns, $cons);
   $arrays = mysqli_fetch_array($querys);


   $con = "DELETE FROM news";
   $query = mysqli_query($conns, $con);

   foreach($querys as $rowss){
    $urlrss = $rowss['urls'];
    $category = $rowss['category_id'];
    $user_id = $rowss['user_id'];
    $id_newssource = $rowss['id'];
    

    guardarXmls($urlrss, $category, $user_id, $id_newssource); 
   }

   function guardarXmls($url, $category, $user_id, $id_newssource) {
    
   
    
    $invalidurl = false;
    if (@simplexml_load_file($url)) {
        $feeds = simplexml_load_file($url);
    } else {
        $invalidurl = true;
        echo "<h2>Invalid RSS feed URL.</h2>";
    }
    
    $i = 0;
    if (!empty($feeds)) {
    
        $site = $feeds->channel->title;
        $sitelink = $feeds->channel->link;
    
        foreach ($feeds->channel->item as $item) {
    
            $title = $item->title;
            $link = $item->link;
            $description = $item->description;
            $postDate = $item->pubDate;
            $pubDate = date('D, d M Y', strtotime($postDate));
    
            $insertar = "INSERT INTO news VALUES ('','$title','$description','$link', '$pubDate', $id_newssource, $user_id, $category) ";
    
            $conectar = getConnection();
            $queryss = mysqli_query($conectar, $insertar);
    
            if ($i >= 16) {
                break;
            }       
    $i++;
        }
      }
    }