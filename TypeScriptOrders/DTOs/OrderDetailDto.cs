namespace TypeScriptOrders.DTOs;

public class OrderDetailDto
{
    public int OrderId { get; set; }
    public int ProductId { get; set; }
    public short Quantity { get; set; }
    public decimal? Price { get; set; }
    public string? CategoryName { get; set; }
    public string? ProductName { get; set; }
}