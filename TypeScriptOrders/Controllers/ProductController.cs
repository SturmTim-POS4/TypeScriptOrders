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
    public class ProductController : ControllerBase
    {
        
        private readonly NorthwndService _northwndService;

        public ProductController(NorthwndService northwndService)
        {
            _northwndService = northwndService;
        }
        
        [HttpGet]
        public IEnumerable<ProductDto> GetProducts()
        {
            return _northwndService
                .GetAllProducts()
                .Select(x => new ProductDto().CopyPropertiesFrom(x)).ToList();
        }
    }
    
    
}