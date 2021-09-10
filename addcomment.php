<?php
$name = $_POST['name'];
$email = $_POST['email'];
$cmnt_text = $_POST['cmnt_text'];

save_cmnt_to_database($name, $email, $cmnt_text);

function save_cmnt_to_database($name, $email, $cmnt_text)
{
    $DBHOST    = 'localhost';
    $DBNAME    = 'comments';
    $DBUSER    = 'root';
    $DBPASS    = 'root';


   /* $db_server = mysql_connect($DBHOST, $DBUSER, $DBPASS)
            or die("Не могу подключиться к серверу MySql!"); 

    mysql_set_charset('utf8', $db_server);
    mysql_select_db($DBNAME, $db_server)
            or die("Не могу подключиться к базе MySql");


            ------------*/
            // Create connection
        $conn = new mysqli($DBHOST, $DBUSER, $DBPASS);

        // Check connection
        if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
        }
        echo "Connected successfully";
        
        $query = "INSERT INTO comments VALUES (1, 2, 3, 4)";
        $conn->query($query);
        


   
    //$query = "INSERT INTO $DBNAME (name, email, cmnt_text) VALUES ('$name','$email','$cmnt_text');";
    //$result = mysql_query($query) or die("Не могу выполнить запрос MYSQL save_cmnt_to_database". mysql_error()."   q=".$query);
    
   // mysql_close($db_server); 
};
