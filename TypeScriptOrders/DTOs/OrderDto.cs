namespace TypeScriptOrders.DTOs;

public class OrderDto
{
    public int OrderId { get; set; }
    
    public DateTime? OrderDate { get; set; }
    
    public DateTime? ShippedDate { get; set; }
    
    public decimal? Freight { get; set; }
    
    public string? ShipName { get; set; }

    public string? EmployeeName { get; set; }
}