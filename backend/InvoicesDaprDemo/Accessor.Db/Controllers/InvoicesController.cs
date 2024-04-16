using Accessor.Db.Contracts.Requests;
using Accessor.Db.Contracts.Responses;
using Accessor.Db.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace Accessor.Db.Controllers;

[ApiController]
[Route("[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly ILogger<InvoicesController> _logger;
    private readonly InvoicesContext _db;

    public InvoicesController(ILogger<InvoicesController> logger, InvoicesContext db)
    {
        _logger = logger;
        _db = db;
    }

    [HttpGet("/invoices")]
    public async Task<ActionResult<List<InvoiceResponse>>> GetAllInvoices()
    {
        try
        {
            var result = await _db.Invoices
                .Select(invoice => 
                    new InvoiceResponse() 
                    { 
                        Id = invoice.Id, 
                        Name = invoice.Name,
                        Amount = invoice.Amount,
                        Status = invoice.Status,
                        DateIssued = invoice.DateIssued
                    })
                .ToListAsync();
            return result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return Problem(ex.Message);
        }
    }

    [HttpPost("/update-invoice")]
    public async Task<ActionResult<InvoiceResponse>> UpdateInvoice([FromBody] InvoiceResponse invoice)
    {
        try
        {
            var invoiceToChange = await _db.Invoices
                .Where(inv => inv.Id == invoice.Id)
                .FirstAsync();

            invoiceToChange.Status = invoice.Status;
            invoiceToChange.Amount = invoice.Amount;
            invoiceToChange.DateIssued = invoice.DateIssued;
            invoiceToChange.Name = invoice.Name;

            await _db.SaveChangesAsync();

            return ToDto(invoiceToChange);
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return Problem(ex.Message);
        }
    }

    [HttpPost("/add-invoice")]
    public async Task<ActionResult<InvoiceResponse>> AddInvoice([FromBody] NewInvoiceRequest invoice)
    {
        try
        {
            var newInvoice = FromDto(invoice);
            _db.Invoices.Add(newInvoice);

            await _db.SaveChangesAsync();

            return ToDto(newInvoice);

        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return Problem(ex.Message);
        }
    }

    private static Invoice FromDto(NewInvoiceRequest invoice)
    {
        return new Invoice()
        {
            Id = Const.NonExistId,
            Status = invoice.Status,
            Amount = invoice.Amount,
            DateIssued = invoice.DateIssued,
            Name = invoice.Name,
        };
    }

    private static InvoiceResponse ToDto(Invoice invoice)
    {
        return new()
        {
            Id = invoice.Id,
            Amount = invoice.Amount,
            DateIssued = invoice.DateIssued,
            Name = invoice.Name,
            Status = invoice.Status,
        };
    }
}
