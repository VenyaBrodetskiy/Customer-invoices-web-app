using Manager.Invoices.Contracts.Responses;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Invoices.Controllers;

[ApiController]
[Route("[controller]")]
public class InvoicesController : ControllerBase
{

    private readonly ILogger<InvoicesController> _logger;

    public InvoicesController(ILogger<InvoicesController> logger)
    {
        _logger = logger;
    }

    [HttpGet("/invoices")]
    public async Task<ActionResult<List<InvoiceResponse>>> GetAllInvoices()
    {
        try
        {
            await Task.Delay(1);
            return new List<InvoiceResponse>
            {
                new()
                {
                    Id = 0,
                    Amount = 12.2,
                    Name = "Test Invoice",
                    Status = "Active"
                }
            };
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return Problem(ex.Message);
        }
    }
}
