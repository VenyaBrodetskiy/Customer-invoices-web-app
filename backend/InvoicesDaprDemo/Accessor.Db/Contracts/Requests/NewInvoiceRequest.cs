namespace Accessor.Db.Contracts.Requests;

public record NewInvoiceRequest
{
    public required string Status { get; set; }
    public required string Name { get; set; }
    public required int Amount { get; set; }
    public required DateTime DateIssued { get; set; }
}
