using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using TypeScriptOrders.DTOs;
using TypeScriptOrders.Services;

namespace TypeScriptOrders.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDetailController : ControllerBase
    {
        private readonly NorthwndService _northwndService;

        public OrderDetailController(NorthwndService northwndService)
        {
            _northwndService = northwndService;
        }
        
        [HttpGet("{orderId}")]
        public IEnumerable<OrderDetailDto> GetOrderDetails(int orderId)
        {
            return _northwndService.GetAllOrderDetails().Where(x => x.OrderId == orderId)
                .Select(x =>
                {
                    var newOrderDetailDto = new OrderDetailDto()
                        .CopyPropertiesFrom(x);
                    newOrderDetailDto.Price = x.Quantity * x.Product.UnitPrice;
                    newOrderDetailDto.CategoryName = x.Product.Category.CategoryName;
                    newOrderDetailDto.ProductName = x.Product.ProductName;
                    return newOrderDetailDto;
                })
                .ToList();
        }
        
        [HttpPost]
        public PostOrderDetailDto PostOrderDetail([FromBody] PostOrderDetailDto postOrderDetailDto)
        {
            var orderDetail = _northwndService.InsertOrderDetail(new OrderDetail().CopyPropertiesFrom(postOrderDetailDto));
            return new PostOrderDetailDto().CopyPropertiesFrom(orderDetail);
        }
        
        [HttpDelete("{orderId}/{productId}")]
        public OrderDetailDto DeleteOrderDetail(int orderId, int productId)
        {
            var orderDetail = _northwndService.DeleteOrderDetail(_northwndService.GetAllOrderDetails()
                .First(x => x.OrderId == orderId && x.ProductId == productId));
            var deleteOrderDetail = new OrderDetailDto()
                .CopyPropertiesFrom(orderDetail);
            deleteOrderDetail.Price = orderDetail.Quantity * orderDetail.Product.UnitPrice;
            deleteOrderDetail.CategoryName = orderDetail.Product.Category.CategoryName;
            deleteOrderDetail.ProductName = orderDetail.Product.ProductName;
            return deleteOrderDetail;
        }
    }
}