using System.ComponentModel.DataAnnotations;

namespace Manager.Invoices.Contracts.Requests;

public record InvoiceRequest
{
    [Required(ErrorMessage = "Id cannot be empty")]
    public required int Id { get; set; }

    [Required(ErrorMessage = "Status cannot be empty")]
    public required string Status { get; set; }

    [Required(ErrorMessage = "Name cannot be empty")]
    public required string Name { get; set; }

    [Required(ErrorMessage = "Amount cannot be empty")]
    public required int Amount { get; set; }

    [Required(ErrorMessage = "DateIssued cannot be empty")]
    public required DateTime DateIssued { get; set; }
}

public record NewInvoiceRequest
{
    [Required(ErrorMessage = "Status cannot be empty")]
    public required string Status { get; set; }

    [Required(ErrorMessage = "Name cannot be empty")]
    public required string Name { get; set; }

    [Required(ErrorMessage = "Amount cannot be empty")]
    public required int Amount { get; set; }

    [Required(ErrorMessage = "DateIssued cannot be empty")]
    public required DateTime DateIssued { get; set; }
}
