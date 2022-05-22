(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
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
},{}],2:[function(require,module,exports){
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
},{}],3:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var baseURL = 'http://localhost:5000/';
$(function () {
    console.log("Hi");
    getOrders("ALFKI");
});
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
            trOrder.addClass("tr-rows");
            trOrder.append($("<td>").html(x.orderDate.substring(0, 10)));
            trOrder.append($("<td>").html(x.employeeName));
            trOrder.append($("<td>").html(x.shippedDate.substring(0, 10)));
            trOrder.append($("<td>").html("".concat(x.freight)));
            trOrder.append($("<td>").html(x.shipName));
            trOrder.click(function () {
                getOrderDetails(x.orderId);
            });
            $('#tblOrders').append(trOrder);
        });
    });
}
function getOrderDetails(orderId) {
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
            trOrderDetail.addClass("tr-rows");
            trOrderDetail.append($("<td>").html("".concat(x.quantity)));
            trOrderDetail.append($("<td>").html(x.productName));
            trOrderDetail.append($("<td>").html(x.categoryName));
            trOrderDetail.append($("<td>").html("".concat(x.price)));
            var btnDelete = $("<button>");
            btnDelete.html("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"> <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/> <path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/> </svg>");
            trOrderDetail.append($("<td>").append(btnDelete));
            $('#tblOrderDetails').append(trOrderDetail);
        });
    });
}
},{}]},{},[3,1,2]);