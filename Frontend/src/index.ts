import {OrderDto} from "./Order";
import {OrderDetailDto} from "./OrderDetail";


const baseURL = 'http://localhost:5000/'

$(() => {
    console.log("Hi");
    getOrders("ALFKI")
})

function getOrders(customerId: string){
    $('#lblOrderTitle').html(`Order of ${customerId}`)
    $('#tblOrders').empty().append("<th>OrderDate</th>\n" +
        "    <th>Employee</th>\n" +
        "    <th>ShippedDate</th>\n" +
        "    <th>Freight</th>\n" +
        "    <th>ShipName</th>")
    $.getJSON(`${baseURL}api/Order/${customerId}`)
        .then((orders: OrderDto[])=>{
            orders.forEach(x => {
                const trOrder = $("<tr>")
                trOrder.addClass("tr-rows")
                trOrder.append($("<td>").html(x.orderDate.substring(0,10)))
                trOrder.append($("<td>").html(x.employeeName))
                trOrder.append($("<td>").html(x.shippedDate.substring(0,10)))
                trOrder.append($("<td>").html(`${x.freight}`))
                trOrder.append($("<td>").html(x.shipName))
                trOrder.click(() => {
                    getOrderDetails(x.orderId)
                })

                $('#tblOrders').append(trOrder)
            })
        })
}
function getOrderDetails(orderId: number) {
    $('#tblOrderDetails').empty().append("<th>Quantity</th>\n" +
        "    <th>Product</th>\n" +
        "    <th>Category</th>\n" +
        "    <th>Price</th>\n" +
        "    <th></th>")

    $('#lblOrderDetailsTitle').html(`Order Nr ${orderId}`)
    $.getJSON(`${baseURL}api/OrderDetail/${orderId}`)
        .then((orderDetails: OrderDetailDto[])=>{
            orderDetails.forEach(x => {
                const trOrderDetail = $("<tr>")
                trOrderDetail.addClass("tr-rows")

                trOrderDetail.append($("<td>").html(`${x.quantity}`))
                trOrderDetail.append($("<td>").html(x.productName))
                trOrderDetail.append($("<td>").html(x.categoryName))
                trOrderDetail.append($("<td>").html(`${x.price}`))
                const btnDelete = $("<button>")
                btnDelete.html("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"> <path d=\"M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z\"/> <path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/> </svg>")
                trOrderDetail.append($("<td>").append(btnDelete))
                $('#tblOrderDetails').append(trOrderDetail)
            })
        })
}
