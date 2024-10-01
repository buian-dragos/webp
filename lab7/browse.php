<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Products Browser</title>
    <script type="text/javascript" src="browse.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

<button class="home" type="button" onclick="location.href='./index.html'">HOME</button>

<center>
    <div id="main">
        <h1> Products </h1>
        <div style="float: left;">
            <select id="select-category" name="Select Filter" onchange="get_filtered_by_category()">
                <option value="All">All</option>
                <?php
                    require_once('database/connection.php');
                    $con = OpenConnection();
                    $sql = "SELECT DISTINCT category FROM products";
                    $result_set = $con->query($sql);

                    if (mysqli_num_rows($result_set) > 0) {
                        while ($row = mysqli_fetch_array($result_set)) {
                            $category = $row['category'];
                            echo '<option value="' . $category . '">' . $category . '</option>';
                        }
                    }
                    CloseConnection($con);
                ?>
            </select>
        </div>
        <br /><br />
        <table id="browse-table" class="browse-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="browse-tbody">
                <!-- Products will be loaded here via AJAX -->
            </tbody>
        </table>
        <div class="pagination"></div>
    </div>
</center>
</body>
</html>
