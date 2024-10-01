<?php
use FTP\Connection;

require_once('database/connection.php');
session_start();

if ($_SERVER['REQUEST_METHOD'] == 'POST') {
    $connection = OpenConnection();
    $id = $connection->real_escape_string($_POST['id']);
    $stmt = $connection->prepare("DELETE FROM products WHERE id=?");
    $stmt->bind_param("i", $id);
    $stmt->execute();
    CloseConnection($connection);
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Products Processing</title>
    <script src="https://code.jquery.com/jquery-3.3.1.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
    <script type="text/javascript" src="script.js"></script>
</head>

<body>
<button class="home" type="button" onclick="location.href='./index.html'">HOME</button>
<br>

<section class="display_delete">
    <br>
    <table class="display-table">
        <thead>
            <th>ID</th>
            <th>Name</th>
            <th>Price</th>
            <th>Category</th>
            <th> </th>
        </thead>
        <tbody>

            <?php
            $con = OpenConnection();
            $result_set = mysqli_query($con, "SELECT * FROM products");
            
            while($row = mysqli_fetch_array($result_set)){
                echo "<tr>";
                echo  "<td>" . $row['id'] . "</td>";
                echo  "<td>" . $row['name'] . "</td>";
                echo  "<td>" . $row['price'] . "</td>";
                echo  "<td>" . $row['category'] . "</td>";
                echo  "<td> 
                            <form method='post' action='delete.php' style='display:inline-block'>
                                <input type='hidden' name='id' value='" . $row['id'] . "'>
                                <input class='btnDelete' type='submit' value='Delete'>
                            </form>
                      </td>
                      </tr>";
            }
            CloseConnection($con);
            ?>

        </tbody>
    </table>
</section>
</body>
</html>
