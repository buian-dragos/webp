function jsonParse(text) {
    let json;
    try {
        json = JSON.parse(text);
    } catch (e) {
        return false;
    }
    return json;
}

function loadCartPage(page) {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let table = document.getElementById("cart-table");
            let oldTableBody = document.getElementById("cart-tbody");

            let newTableBody = document.createElement('tbody');
            newTableBody.id = 'cart-tbody';

            let response = jsonParse(this.responseText);
            let products = response.products;
            for (let i = 0; i < products.length; i++) {
                let product = products[i];
                let row = newTableBody.insertRow();
                Object.keys(product).forEach(function (k) {
                    let text;
                    let cell = row.insertCell();
                    text = product[k];
                    cell.appendChild(document.createTextNode(text));
                });
                let cell = row.insertCell();
                let button = document.createElement('button');
                button.innerText = 'Remove from Cart';
                button.onclick = function() {
                    removeFromCart(product.id);
                };
                cell.appendChild(button);
            }
            table.replaceChild(newTableBody, oldTableBody);

            updatePagination(response.total_pages, response.current_page);
        }
    };

    let json = JSON.stringify({'page': page});
    ajax.open('POST', 'get_cart_products.php', true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(json);
}

function updatePagination(total_pages, current_page) {
    let paginationDiv = document.querySelector(".pagination");
    paginationDiv.innerHTML = '';

    if (current_page > 1) {
        let prevLink = document.createElement('a');
        prevLink.href = '#';
        prevLink.innerText = 'Previous';
        prevLink.onclick = function() {
            loadCartPage(current_page - 1);
        };
        paginationDiv.appendChild(prevLink);
    }

    if (current_page < total_pages) {
        let nextLink = document.createElement('a');
        nextLink.href = '#';
        nextLink.innerText = 'Next';
        nextLink.onclick = function() {
            loadCartPage(current_page + 1);
        };
        paginationDiv.appendChild(nextLink);
    }
}

function removeFromCart(pid) {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let response = jsonParse(this.responseText);
            if (response.status === 'success') {
                alert('Product removed from cart!');
                loadCartPage(1);
            } else {
                alert('Failed to remove product from cart: ' + response.message);
            }
        }
    };

    let json = JSON.stringify({'pid': pid});
    ajax.open('POST', 'remove_from_cart.php', true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(json);
}

document.addEventListener("DOMContentLoaded", function() {
    loadCartPage(1);
});
