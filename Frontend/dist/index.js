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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXguanMiLCJzb3VyY2VSb290IjoiLi9zcmMvIiwic291cmNlcyI6WyJpbmRleC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUlBLElBQU0sT0FBTyxHQUFHLHdCQUF3QixDQUFBO0FBRXhDLENBQUMsQ0FBQztJQUNFLE9BQU8sQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7SUFDbEIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFBO0FBQ3RCLENBQUMsQ0FBQyxDQUFBO0FBRUYsU0FBUyxTQUFTLENBQUMsVUFBa0I7SUFDakMsQ0FBQyxDQUFDLGdCQUFnQixDQUFDLENBQUMsSUFBSSxDQUFDLG1CQUFZLFVBQVUsQ0FBRSxDQUFDLENBQUE7SUFDbEQsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDLE1BQU0sQ0FBQyxzQkFBc0I7UUFDakQseUJBQXlCO1FBQ3pCLDRCQUE0QjtRQUM1Qix3QkFBd0I7UUFDeEIsdUJBQXVCLENBQUMsQ0FBQTtJQUM1QixDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUcsT0FBTyx1QkFBYSxVQUFVLENBQUUsQ0FBQztTQUN6QyxJQUFJLENBQUMsVUFBQyxNQUFrQjtRQUNyQixNQUFNLENBQUMsT0FBTyxDQUFDLFVBQUEsQ0FBQztZQUNaLElBQU0sT0FBTyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQTtZQUN6QixPQUFPLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFBO1lBQzNCLE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDLEVBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFBO1lBQzNELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQTtZQUM5QyxPQUFPLENBQUMs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