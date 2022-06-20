import {OrderDto} from "./Order";
import {OrderDetailDto} from "./OrderDetail";
import {CustomerDto} from "./Customer";
import {ProductDto} from "./Product";


const baseURL = 'http://localhost:5000/'

$(() => {
    $('#divAdd').hide()
    $('#btnAddOrderDetail').click(addOrderDetail)
    getLetters()
    getProducts()
})

function fillCustomers(letter: string) {
    $.getJSON(`${baseURL}api/customer`)
        .then((customers: CustomerDto[]) => {
            customers.filter(x => x.contactName.substring(0,1) == letter).forEach(x => {
                $(`#lstCustomer${letter}`).append($("<li>").html(x.contactName).addClass("hoverColor").click(() => {
                    getOrders(x.customerId)
                }))
            })
        })
}

function getLetters() {
    const abc: string[] = []
    $.getJSON(`${baseURL}api/customer`)
        .then((customers: CustomerDto[]) => {
            customers.forEach(x => {
                if (abc.indexOf(x.contactName.substring(0,1)) == -1){
                    abc.push(x.contactName.substring(0,1));
                }
            })
            abc.sort()
            abc.forEach(x => {
                const lblLetter = $("<div>")
                lblLetter.html(x)
                lblLetter.val(x)
                lblLetter.addClass("lbl-letter").addClass("hoverColor")
                const customersContainer = $(`<ul id="lstCustomer${x}">`)
                customersContainer.hide()
                lblLetter.click(() => {
                    const activeLetter = $(".lbl-letter.active")
                    activeLetter.removeClass("active")
                    $(`#lstCustomer${activeLetter.val()}`).empty().hide()

                    lblLetter.addClass("active")

                    customersContainer.show()
                    fillCustomers(x)
                })
                $('#divLetters').append(lblLetter).append(customersContainer)
            })
        })
}
function getProducts() {
    $.getJSON(`${baseURL}api/product`)
        .then((products: ProductDto[]) => {
            products.forEach(x => {
                $('#cbProduct').append($("<option>").html(x.productName).val(x.productId))
            })
        })
}

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
                trOrder.addClass("hoverColor").addClass("order")
                trOrder.val(x.orderId)
                trOrder.append($("<td>").html(x.orderDate.substring(0,10)))
                trOrder.append($("<td>").html(x.employeeName))
                trOrder.append($("<td>").html(x.shippedDate.substring(0,10)))
                trOrder.append($("<td>").html(`${x.freight}`))
                trOrder.append($("<td>").html(x.shipName))
                trOrder.click(() => {
                    getOrderDetails(x.orderId)
                    const activeOrder = $(".order.active")
                    activeOrder.removeClass("active")
                    trOrder.addClass("active")
                })

                $('#tblOrders').append(trOrder)
            })
        })
}
function getOrderDetails(orderId: number) {
    let totalPrice = 0;
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
                trOrderDetail.addClass("hoverColor")
                trOrderDetail.append($("<td>").html(`${x.quantity}`))
                trOrderDetail.append($("<td>").html(x.productName))
                trOrderDetail.append($("<td>").html(x.categoryName))
                trOrderDetail.append($("<td>").html(`${x.price} €`))
                totalPrice += x.price;
                const btnDelete = $("<button>")
                btnDelete.html("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"> " +
                    "<path fill-rule=\"evenodd\" d=\"M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z\"/> </svg>")
                btnDelete.click(() => {
                    const orderId = x.orderId;
                    $.ajax({
                        url: `${baseURL}api/OrderDetail/${orderId}/${(x.productId)}`,
                        type: "delete"
                    }).then(() => getOrderDetails(orderId))
                })
                trOrderDetail.append($("<td>").append(btnDelete))
                $('#tblOrderDetails').append(trOrderDetail)
            })
            const trTotal = $("<tr>")

            trTotal.append($("<td colspan='3'>").html("Total"))
            trTotal.append($("<td>").html(`${totalPrice} €`))

            const buttonAdd = $("<button>")
            buttonAdd.html("<svg xmlns=\"http://www.w3.org/2000/svg\" width=\"16\" height=\"16\" fill=\"currentColor\" class=\"bi bi-trash\" viewBox=\"0 0 16 16\"> " +
                "<path fill-rule=\"evenodd\" d=\"M10.5 3.5a2.5 2.5 0 0 0-5 0V4h5v-.5zm1 0V4H15v10a2 2 0 0 1-2 2H3a2 2 0 0 1-2-2V4h3.5v-.5a3.5 3.5 0 1 1 7 0zM8.5 8a.5.5 0 0 0-1 0v1.5H6a.5.5 0 0 0 0 1h1.5V12a.5.5 0 0 0 1 0v-1.5H10a.5.5 0 0 0 0-1H8.5V8z\"/>\n" +
                "</svg>")
            buttonAdd.click(() => {
                $('#divAdd').show()
            })
            trTotal.append($("<td>").append(buttonAdd))

            $('#tblOrderDetails').append(trTotal)
        })
}

function addOrderDetail() {
    const orderId= $(".order.active").val()
    const productId = $("#cbProduct option:selected").val()
    const quantity = $('#ipQuantity').val()
    const data = {
        "orderId": orderId,
        "productId": productId,
        "quantity": quantity
    };
    $.ajax({
        url: `${baseURL}api/OrderDetail`,
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json'
    })
        .then(() => {
            getOrderDetails(Number(orderId))
            $('#divAdd').hide()
        });
}
