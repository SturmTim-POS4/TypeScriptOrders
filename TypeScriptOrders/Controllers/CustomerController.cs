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
    public class CustomerController : ControllerBase
    {
        
        private readonly NorthwndService _northwndService;

        public CustomerController(NorthwndService northwndService)
        {
            _northwndService = northwndService;
        }
        
        [HttpGet]
        public IEnumerable<CustomerDto> Get()
        {
            return _northwndService.GetAllCustomers().Select(x => new CustomerDto()
                .CopyPropertiesFrom(x))
                .ToList();
        }
    }
}