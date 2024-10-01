<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Cart</title>
    <script type="text/javascript" src="browse_cart.js"></script>
    <link rel="stylesheet" type="text/css" href="style.css">
</head>
<body>

<button class="home" type="button" onclick="location.href='./index.html'">HOME</button>

<center>
    <div id="main">
        <h1> Cart </h1>
        <br /><br />
        <table id="cart-table" class="browse-table">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Category</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody id="cart-tbody">
                <!-- Cart products will be loaded here via AJAX -->
            </tbody>
        </table>
        <div class="pagination"></div>
    </div>
</center>
</body>
</html>
