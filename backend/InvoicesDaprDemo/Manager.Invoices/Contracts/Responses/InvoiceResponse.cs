namespace Manager.Invoices.Contracts.Responses;

public record InvoiceResponse
{
    public required int Id { get; set; }

    public required string Status { get; set; }
    public required string Name { get; set; }
    public required int Amount { get; set; }
    public required DateTime DateIssued { get; set; }
}
