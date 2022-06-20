(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CustomerDto = void 0;
var CustomerDto = /** @class */ (function () {
    function CustomerDto(customerId, contactName) {
        this.customerId = customerId;
        this.contactName = contactName;
    }
    return CustomerDto;
}());
exports.CustomerDto = CustomerDto;
},{}],2:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDto = void 0;
var OrderDto = /** @class */ (function () {
    function OrderDto(orderId, orderDate, employeeName, shippedDate, freight, shipName) {
        this.orderId = orderId;
        this.orderDate = orderDate;
        this.employeeName = employeeName;
        this.shippedDate = shippedDate;
        this.freight = freight;
        this.shipName = shipName;
    }
    return OrderDto;
}());
exports.OrderDto = OrderDto;
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderDetailDto = void 0;
var OrderDetailDto = /** @class */ (function () {
    function OrderDetailDto(productId, orderId, quantity, price, categoryName, productName) {
        this.productId = productId;
        this.orderId = orderId;
        this.quantity = quantity;
        this.price = price;
        this.categoryName = categoryName;
        this.productName = productName;
    }
    return OrderDetailDto;
}());
exports.OrderDetailDto = OrderDetailDto;
},{}],4:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductDto = void 0;
var ProductDto = /** @class */ (function () {
    function ProductDto(productId, productName) {
        this.productId = productId;
        this.productName = productName;
    }
    return ProductDto;
}());
exports.ProductDto = ProductDto;
},{}],5:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var baseURL = 'http://localhost:5000/';
$(function () {
    $('#divAdd').hide();
    $('#btnAddOrderDetail').click(addOrderDetail);
    getLetters();
    getProducts();
});
function fillCustomers(letter) {
    $.getJSON("".concat(baseURL, "api/customer"))
        .then(function (customers) {
        customers.filter(function (x) { return x.contactName.substring(0, 1) == letter; }).forEach(function (x) {
            $("#lstCustomer".concat(letter)).append($("<li>").html(x.contactName).addClass("hoverColor").click(function () {
                getOrders(x.customerId);
            }));
        });
    });
}
function getLetters() {
    var abc = [];
    $.getJSON("".concat(baseURL, "api/customer"))
        .then(function (customers) {
        customers.forEach(function (x) {
            if (abc.indexOf(x.contactName.substring(0, 1)) == -1) {
                abc.push(x.contactName.substring(0, 1));
            }
        });
        abc.sort();
        abc.forEach(function (x) {
            var lblLetter = $("<div>");
            lblLetter.html(x);
            lblLetter.val(x);
            lblLetter.addClass("lbl-letter").addClass("hoverColor");
            var customersContainer = $("<ul id=\"lstCustomer".concat(x, "\">"));
            customersContainer.hide();
            lblLetter.click(function () {
                var activeLetter = $(".lbl-letter.active");
                activeLetter.removeClass("active");
                $("#lstCustomer".concat(activeLetter.val())).empty().hide();
                lblLetter.addClass("active");
                customersContainer.show();
                fillCustomers(x);
            });
            $('#divLetters').append(lblLetter).append(customersContainer);
        });
    });
}
function getProducts() {
    $.getJSON("".concat(baseURL, "api/product"))
        .then(function (products) {
        products.forEach(function (x) {
            $('#cbProduct').append($("<option>").html(x.productName).val(x.productId));
        });
    });
}
function getOrders(customerId) {
    $('#lblOrderTitle').html("Order of ".concat(customerId));
    $('#tblOrders').empty().append("<th>OrderDate</th>\n" +
        "    <th>Employee</th>\n" +
        "    <th>ShippedDate</th>\n" +
        "    <th>Freight</th>\n" +
        "    <th>ShipName</th>");
    $.getJSON("".concat(baseURL, "api/Order/").concat(customerId))
        .then(function (orders) {
        orders.forEach(function (x) {
            var trOrder = $("<tr>");
            trOrder.addClass("hoverColor").addClass("order");
            trOrder.val(x.orderId);
            trOrder.append($("<td>").html(x.orderDate.substring(0, 10)));
            trOrder.append($("<td>").html(x.employeeName));
            trOrder.append($("<td>").html(x.shippedDate.substring(0, 10)));
            trOrder.append($("<td>").html("".concat(x.freight)));
            trOrder.append($("<td>").html(x.shipName));
            trOrder.click(function () {
                getOrderDetails(x.orderId);
                var activeOrder = $(".order.active");
                activeOrder.removeClass("active");
                trOrder.addClass("active");
            });
            $('#tblOrders').append(trOrder);
        });
    });
}
function getOrderDetails(orderId) {
    var totalPrice = 0;
    $('#tblOrderDetails').empty().append("<th>Quantity</th>\n" +
        "    <th>Product</th>\n" +
        "    <th>Category</th>\n" +
        "    <th>Price</th>\n" +
        "    <th></th>");
    $('#lblOrderDetailsTitle').html("Order Nr ".concat(orderId));
    $.getJSON("".concat(baseURL, "api/OrderDetail/").concat(orderId))
        .then(function (orderDetails) {
        orderDetails.forEach(function (x) {
            var trOrderDetail = $("<tr>");
            trOrderDetail.addClass("hoverColor");
            trOrderDetail.append($("<td>").html("".concat(x.quantity)));
            trOrderDetail.append($("<td>").html(x.productName));
            trOrderDetail.append($("<td>").html(x.categoryName));
            trOrderDetail.append($("<td>").html("".concat(x.price, " \u20AC")));
            totalPrice += x.price;
            var btnDelete = $("<button>");
            btnDelete.html("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"> " +
                "<path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/> </svg>");
            btnDelete.click(function () {
                var orderId = x.orderId;
                $.ajax({
                    url: "".concat(baseURL, "api/OrderDetail/").concat(orderId, "/").concat((x.productId)),
                    type: "delete"
                }).then(function () { return getOrderDetails(orderId); });
            });
            trOrderDetail.append($("<td>").append(btnDelete));
            $('#tblOrderDetails').append(trOrderDetail);
        });
        var trTotal = $("<tr>");
        trTotal.append($("<td colspan='3'>").html("Total"));
        trTotal.append($("<td>").html("".concat(totalPrice, " \u20AC")));
        var buttonAdd = $("<button>");
        buttonAdd.html("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"> " +
            "<path fill-rule=\"evenodd\" d=\"M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z\"/>\n" +
            "</svg>");
        buttonAdd.click(function () {
            $('#divAdd').show();
        });
        trTotal.append($("<td>").append(buttonAdd));
        $('#tblOrderDetails').append(trTotal);
    });
}
function addOrderDetail() {
    var orderId = $(".order.active").val();
    var productId = $("#cbProduct option:selected").val();
    var quantity = $('#ipQuantity').val();
    var data = {
        "orderId": orderId,
        "productId": productId,
        "quantity": quantity
    };
    $.ajax({
        url: "".concat(baseURL, "api/OrderDetail"),
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    })
        .then(function () {
        getOrderDetails(Number(orderId));
        $('#divAdd').hide();
    });
}
},{}]},{},[5,2,3,1,4]);
