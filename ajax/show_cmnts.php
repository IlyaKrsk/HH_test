<?php
//header("Content-type: application/json; charset=utf-8");

show_cmnts();

function show_cmnts()
{
    $DBHOST    = 'localhost';
    $DBNAME    = 'hhtest';
    $DBUSER    = 'hhtest';
    $DBPASS    = 'hhtest';

    $out = "";


    $conn = new mysqli($DBHOST, $DBUSER, $DBPASS, $DBNAME);

    if ($conn->connect_error) {
        $out = "Connection failed: " . $conn->connect_error;
    }

    $query = "SELECT * FROM `comments`;";

    if ($result = $conn->query($query)) {
         //$out = "Read comments successfull<br>";
        //$out = mysqli_fetch_all($result);
        while ($row = mysqli_fetch_assoc($result)) {
            $out = $out.'{"name":"'.$row["name"].'","email":"'.$row["email"].'", "cmnt_text":"'.$row["cmnt_text"].'"},';
            
        }
    } else {
        $out = "Error: " . $query . "<br>" . $conn->error;
    }

    $conn->close();

    $json_str = "[".trim($out, ",")."]";
   echo json_encode($json_str);
};

?>