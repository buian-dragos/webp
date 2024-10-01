<?php
require_once('database/connection.php');

// Allow from any origin
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Content-Type: application/json");

// Handle preflight request
if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
    header("Access-Control-Allow-Headers: Content-Type");
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $input = json_decode(file_get_contents('php://input'), true);
    $pid = $input['pid'];

    $con = OpenConnection();

    // Delete product from cart
    $stmt = $con->prepare("DELETE FROM cart WHERE pid = ?");
    $stmt->bind_param("i", $pid);
    
    if ($stmt->execute()) {
        echo json_encode(['status' => 'success']);
    } else {
        echo json_encode(['status' => 'error', 'message' => 'Failed to execute statement']);
    }

    $stmt->close();
    CloseConnection($con);
}
?>
