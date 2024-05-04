using Accessor.Db.Contracts.Requests;
using Accessor.Db.Contracts.Responses;
using Accessor.Db.Services;
using Microsoft.AspNetCore.Mvc;

namespace Accessor.Db.Controllers;

[ApiController]
[Route("[controller]")]
public class InvoicesController(ILogger<InvoicesController> logger, InvoicesService invoicesService) : ControllerBase
{
    [HttpGet("/invoices")]
    public async Task<ActionResult<List<InvoiceResponse>>> GetAllInvoices()
    {
        try
        {
            var result = await invoicesService.GetAllInvoices();

            return result;
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            return Problem(ex.Message);
        }
    }

    [HttpGet("/invoice/{id}")]
    public async Task<ActionResult<InvoiceResponse?>> GetInvoice(int id)
    {
        try
        {
            var result = await invoicesService.GetInvoice(id);

            return result is null ? NoContent() : result;
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            return Problem(ex.Message);
        }
    }

    [HttpPost("/update-invoice")]
    public async Task<ActionResult<InvoiceResponse>> UpdateInvoice([FromBody] InvoiceResponse invoice)
    {
        try
        {
            var result = await invoicesService.UpdateInvoice(invoice);

            return result;
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            return Problem(ex.Message);
        }
    }

    [HttpPost("/add-invoice")]
    public async Task<ActionResult<InvoiceResponse>> AddInvoice([FromBody] NewInvoiceRequest invoice)
    {
        try
        {
            var result = await invoicesService.AddInvoice(invoice);

            return result;
        }
        catch (Exception ex)
        {
            logger.LogError(ex.Message);
            return Problem(ex.Message);
        }
    }
}
