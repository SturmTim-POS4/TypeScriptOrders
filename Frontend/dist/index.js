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
        .then(function () { return getOrderDetails(Number(orderId)); });
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQU1BLElBQU0sT0FBTyxHQUFHLHdCQUF3QixDQUFBO0FBRXhDLENBQUMsQ0FBQztJQUNFLENBQUMsQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQTtJQUNuQixDQUFDLENBQUMsb0JBQW9CLENBQUMsQ0FBQyxLQUFLLENBQUMsY0FBYyxDQUFDLENBQUE7SUFDN0MsVUFBVSxFQUFFLENBQUE7SUFDWixXQUFXLEVBQUUsQ0FBQTtBQUNqQixDQUFDLENBQUMsQ0FBQTtBQUVGLFNBQVMsYUFBYSxDQUFDLE1BQWM7SUFDakMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFHLE9BQU8saUJBQWMsQ0FBQztTQUM5QixJQUFJLENBQUMsVUFBQyxTQUF3QjtRQUMzQixTQUFTLENBQUMsTUFBTSxDQUFDLFVBQUEsQ0FBQyxJQUFJLE9BQUEsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxFQUFDLENBQUMsQ0FBQyxJQUFJLE1BQU0sRUFBdEMsQ0FBc0MsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxVQUFBLENBQUM7WUFDbkUsQ0FBQyxDQUFDLHNCQUFlLE1BQU0sQ0FBRSxDQUFDLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxZQUFZLENBQUMsQ0FBQyxLQUFLLENBQUM7Z0JBQ3pGLFNBQVMsQ0FBQyxDQUFDLENBQUMsVUFBVSxDQUFDLENBQUE7WUFDM0IsQ0FBQyxDQUFDLENBQUMsQ0FBQTtRQUNQLENBQUMsQ0FBQyxDQUFBO0lBQ04sQ0FBQyxDQUFDLENBQUE7QUFDVixDQUFDO0FBRUQsU0FBUyxVQUFVO0lBQ2YsSUFBTSxHQUFHLEdBQWEsRUFBRSxDQUFBO0lBQ3hCLENBQUMsQ0FBQyxPQUFPLENBQUMsVUFB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