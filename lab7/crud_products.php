<?php

include('database/connection.php');

header('Content-Type: application/json');
header("Access-Control-Allow-Origin: http://localhost:4200");
header("Access-Control-Allow-Methods: POST, GET, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");

if ($_SERVER['REQUEST_METHOD'] == 'OPTIONS') {
    exit(0);
}

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $con = OpenConnection();
    $input = json_decode(file_get_contents('php://input'), true);

    if (isset($input['delete']) && isset($input['id'])) {
        $id = $con->real_escape_string($input['id']);
        $stmt = $con->prepare("DELETE FROM products WHERE id=?");
        $stmt->bind_param("i", $id);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "Product deleted successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
        }

        $stmt->close();
    } elseif (isset($input['id']) && isset($input['name']) && isset($input['price']) && isset($input['category'])) {
        $id = $con->real_escape_string($input['id']);
        $name = $con->real_escape_string($input['name']);
        $price = $con->real_escape_string($input['price']);
        $category = $con->real_escape_string($input['category']);

        $stmt = $con->prepare("INSERT INTO products (id, name, price, category) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("isds", $id, $name, $price, $category);

        if ($stmt->execute()) {
            echo json_encode(["status" => "success", "message" => "New product added successfully"]);
        } else {
            echo json_encode(["status" => "error", "message" => "Error: " . $stmt->error]);
        }

        $stmt->close();
    } else {
        echo json_encode(["status" => "error", "message" => "Invalid input"]);
    }
    CloseConnection($con);
} else {
    echo json_encode(["status" => "error", "message" => "Invalid request method"]);
}
?>
