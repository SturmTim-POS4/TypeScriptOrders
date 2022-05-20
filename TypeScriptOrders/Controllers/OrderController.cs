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
    public class OrderController : ControllerBase
    {
        private readonly NorthwndService _northwndService;

        public OrderController(NorthwndService northwndService)
        {
            _northwndService = northwndService;
        }
        
        [HttpGet("{customerId}")]
        public IEnumerable<OrderDto> GetOrdersOfCustomer(string customerId)
        {
            return _northwndService.GetAllOrders().Where(x => x.CustomerId == customerId)
                .Select(x =>
                {
                    var newOrderDto = new OrderDto()
                        .CopyPropertiesFrom(x);
                    newOrderDto.EmployeeName = $"{x.Employee.LastName} {x.Employee.FirstName}";
                    return newOrderDto;
                })
                .ToList();
        }
    }
}