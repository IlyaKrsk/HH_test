<?php
$name = htmlspecialchars(strip_tags($_POST['name']));
$email = htmlspecialchars(strip_tags($_POST['email']));
$cmnt_text = htmlspecialchars(strip_tags($_POST['cmnt_text']));

if ($name) save_cmnt_to_database($name, $email, $cmnt_text);


function save_cmnt_to_database($name, $email, $cmnt_text)
{
    $DBHOST    = 'localhost';
    $DBNAME    = 'hhtest';
    $DBUSER    = 'hhtest';
    $DBPASS    = 'hhtest';

    // Create connection
    $conn = new mysqli($DBHOST, $DBUSER, $DBPASS, $DBNAME);

    // Check connection
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }
    //echo "Connected successfully";

    $query = "INSERT INTO `comments` (`name`, `email`, `cmnt_text`) VALUES ('$name', '$email', '$cmnt_text');";

    if ($conn->query($query) === TRUE) {
        //  echo "New record created successfully";
    } else {
        echo "Error: " . $query . "<br>" . $conn->error;
    }

    $conn->close();
};

