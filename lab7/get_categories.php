<?php
require_once('database/connection.php');

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$con = OpenConnection();
$sql = "SELECT DISTINCT category FROM products";
$result_set = $con->query($sql);

$categories = [];
if (mysqli_num_rows($result_set) > 0) {
    while ($row = mysqli_fetch_array($result_set)) {
        $categories[] = $row['category'];
    }
}

echo json_encode($categories);
CloseConnection($con);
?>
