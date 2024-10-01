<?php
require_once('database/connection.php');

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

$con = OpenConnection();
$result_set = mysqli_query($con, "SELECT * FROM products");

$products = [];
while ($row = mysqli_fetch_assoc($result_set)) {
    $products[] = $row;
}

echo json_encode($products);
CloseConnection($con);
?>
