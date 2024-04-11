using System.ComponentModel.DataAnnotations;

namespace Manager.Invoices.Contracts.Responses;

public record InvoiceResponse
{
    public required int Id { get; set; }

    public required string Status { get; set; }
    public required string Name { get; set; }
    public required double Amount { get; set; }
}
