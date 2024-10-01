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
    $page = isset($input['page']) ? (int)$input['page'] : 1;
    $limit = 4;
    $offset = ($page - 1) * $limit;

    $con = OpenConnection();

    // Join cart and products table to get product details
    $stmt = $con->prepare("SELECT p.id, p.name, p.price, p.category FROM cart c JOIN products p ON c.pid = p.id LIMIT ? OFFSET ?");
    $stmt->bind_param("ii", $limit, $offset);
    $stmt->execute();
    $result_set = $stmt->get_result();

    $total_results = $con->query("SELECT COUNT(*) AS count FROM cart")->fetch_assoc()['count'];
    $total_pages = ceil($total_results / $limit);

    $products = [];
    while ($row = mysqli_fetch_assoc($result_set)) {
        $products[] = $row;
    }

    echo json_encode(['products' => $products, 'total_pages' => $total_pages, 'current_page' => $page]);

    $stmt->close();
    CloseConnection($con);
}
?>
