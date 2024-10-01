<?php
session_start();
include ('database/connection.php');

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $con = OpenConnection();
    if (isset($_POST['add'])) {
        $id = $con->real_escape_string($_POST['id']);
        $name = $con->real_escape_string($_POST['name']);
        $price = $con->real_escape_string($_POST['price']);
        $category = $con->real_escape_string($_POST['category']);

        $stmt = $con->prepare("INSERT INTO products (id, name, price, category) VALUES (?, ?, ?, ?)");
        $stmt->bind_param("isds", $id, $name, $price, $category);

        if ($stmt->execute()) {
            echo "New product added successfully";
        } else {
            echo "Error: " . $stmt->error;
        }

        $stmt->close();
    }
    CloseConnection($con);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Add Product</title>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>
<button class="home" type="button" onclick="location.href='./index.html'">HOME</button>
<br>

<section class="add_form">
    <form action="add.php" method="post">
        <input id="id" type="text" name="id" placeholder="ID" required>
        <input id="name" type="text" name="name" placeholder="Name" required>
        <input id="price" type="text" name="price" placeholder="Price" required>
        <input id="category" type="text" name="category" placeholder="Category" required>
        <input id="add" type="submit" name="add" value="Add new product">
    </form>
</section>

<section class="display_add">
    <br>
    <table class="display-table">
        <thead>
            <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Price</th>
                <th>Category</th>
            </tr>
        </thead>
        <tbody>
            <?php
            $con = OpenConnection();
            $result_set = mysqli_query($con, "SELECT * FROM products");

            while ($row = mysqli_fetch_array($result_set)) {
                echo "<tr>";
                echo "<td>" . $row['id'] . "</td>";
                echo "<td>" . $row['name'] . "</td>";
                echo "<td>" . $row['price'] . "</td>";
                echo "<td>" . $row['category'] . "</td>";
                echo "</tr>";
            }
            CloseConnection($con);
            ?>
        </tbody>
    </table>
</section>
</body>
</html>
