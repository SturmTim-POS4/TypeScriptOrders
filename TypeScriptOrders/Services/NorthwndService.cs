namespace TypeScriptOrders.Services;

public class NorthwndService
{
    private readonly NORTHWNDContext _db;

    public NorthwndService(NORTHWNDContext db)
    {
        _db = db;
    }

    public IEnumerable<Customer> GetAllCustomers()
    {
        return _db.Customers.AsEnumerable();
    }
    
    public IEnumerable<Order> GetAllOrders()
    {
        return _db.Orders.Include(x => x.Employee).AsEnumerable();
    }
    
    public IEnumerable<OrderDetail> GetAllOrderDetails()
    {
        return _db.OrderDetails.Include(x => x.Product)
            .ThenInclude(x => x.Category).AsEnumerable();
    }
    
    public OrderDetail DeleteOrderDetail(OrderDetail orderDetail)
    {
        _db.OrderDetails.Remove(orderDetail);
        _db.SaveChanges();
        return orderDetail;
    }
    
    public OrderDetail InsertOrderDetail(OrderDetail orderDetail)
    {
        _db.OrderDetails.Add(orderDetail);
        _db.SaveChanges();
        return orderDetail;
    }
    
}