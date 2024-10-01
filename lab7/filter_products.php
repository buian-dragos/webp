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
    $category = $input['category'];
    $page = isset($input['page']) ? (int)$input['page'] : 1;
    $limit = 4;
    $offset = ($page - 1) * $limit;

    $con = OpenConnection();
    if ($category == 'All') {
        $stmt = $con->prepare("SELECT * FROM products LIMIT ? OFFSET ?");
        $stmt->bind_param("ii", $limit, $offset);
        $stmt->execute();
        $result_set = $stmt->get_result();

        $total_results = $con->query("SELECT COUNT(*) AS count FROM products")->fetch_assoc()['count'];
    } else {
        $stmt = $con->prepare("SELECT * FROM products WHERE category = ? LIMIT ? OFFSET ?");
        $stmt->bind_param("sii", $category, $limit, $offset);
        $stmt->execute();
        $result_set = $stmt->get_result();

        $count_stmt = $con->prepare("SELECT COUNT(*) AS count FROM products WHERE category = ?");
        $count_stmt->bind_param("s", $category);
        $count_stmt->execute();
        $total_results = $count_stmt->get_result()->fetch_assoc()['count'];
        $count_stmt->close();
    }

    $products = [];
    while ($row = mysqli_fetch_assoc($result_set)) {
        $products[] = $row;
    }

    $total_pages = ceil($total_results / $limit);

    echo json_encode(['products' => $products, 'total_pages' => $total_pages, 'current_page' => $page]);

    $stmt->close();
    CloseConnection($con);
}
?>
