function jsonParse(text) {
    let json;
    try {
        json = JSON.parse(text);
    } catch (e) {
        return false;
    }
    return json;
}

function get_filtered_by_category() {
    loadPage(1);
}

function updatePagination(total_pages, current_page) {
    let paginationDiv = document.querySelector(".pagination");
    paginationDiv.innerHTML = '';

    if (current_page > 1) {
        let prevLink = document.createElement('a');
        prevLink.href = '#';
        prevLink.innerText = 'Previous';
        prevLink.onclick = function() {
            loadPage(current_page - 1);
        };
        paginationDiv.appendChild(prevLink);
    }

    if (current_page < total_pages) {
        let nextLink = document.createElement('a');
        nextLink.href = '#';
        nextLink.innerText = 'Next';
        nextLink.onclick = function() {
            loadPage(current_page + 1);
        };
        paginationDiv.appendChild(nextLink);
    }
}

function loadPage(page) {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let table = document.getElementById("browse-table");
            let oldTableBody = document.getElementById("browse-tbody");

            let newTableBody = document.createElement('tbody');
            newTableBody.id = 'browse-tbody';

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
                // Add the Add to Cart button
                let cell = row.insertCell();
                let button = document.createElement('button');
                button.innerText = 'Add to Cart';
                button.onclick = function() {
                    addToCart(product.id);
                };
                cell.appendChild(button);
            }
            table.replaceChild(newTableBody, oldTableBody);

            updatePagination(response.total_pages, response.current_page);
        }
    };

    let category = document.getElementById("select-category").value;
    let json = JSON.stringify({'category': category, 'page': page});
    ajax.open('POST', 'filter_products.php', true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(json);
}

function addToCart(pid) {
    var ajax = new XMLHttpRequest();

    ajax.onreadystatechange = function() {
        if (this.readyState === 4 && this.status === 200) {
            let response = jsonParse(this.responseText);
            if (response.status === 'success') {
                alert('Product added to cart!');
            } else {
                alert('Failed to add product to cart: ' + response.message);
            }
        }
    };

    let json = JSON.stringify({'pid': pid});
    ajax.open('POST', 'add_to_cart.php', true);
    ajax.setRequestHeader("Content-Type", "application/json");
    ajax.send(json);
}


document.addEventListener("DOMContentLoaded", function() {
    loadPage(1);
});
