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
}
