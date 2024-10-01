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

    // Check if the product is already in the cart
    $check_stmt = $con->prepare("SELECT * FROM cart WHERE pid = ?");
    $check_stmt->bind_param("i", $pid);
    $check_stmt->execute();
    $check_result = $check_stmt->get_result();

    if ($check_result->num_rows > 0) {
        // Product already in cart
        echo json_encode(['status' => 'error', 'message' => 'Product already in cart']);
    } else {
        // Insert into cart
        $stmt = $con->prepare("INSERT INTO cart (pid) VALUES (?)");
        $stmt->bind_param("i", $pid);
    
        if ($stmt->execute()) {
            echo json_encode(['status' => 'success']);
        } else {
            echo json_encode(['status' => 'error', 'message' => 'Failed to execute statement']);
        }

        $stmt->close();
    }

    $check_stmt->close();
    CloseConnection($con);
}
?>
