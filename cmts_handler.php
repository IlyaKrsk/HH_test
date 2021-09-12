<?php
$getjson = $_POST['getjson'];
$name = $_POST['name'];
$email = $_POST['email'];
$cmnt_text = $_POST['cmnt_text'];

if ($name) save_cmnt_to_database($name, $email, $cmnt_text);
else if ($getjson) show_cmnts();

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
        // $out = "Read comments successfully";
        $out = mysqli_fetch_all($result);
    } else {
        $out = "Error: " . $query . "<br>" . $conn->error;
    }

    $conn->close();

    header("Content-type: application/json; charset=utf-8");
    echo json_encode($out);
};

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
