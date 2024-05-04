using Accessor.Db.Contracts.Requests;
using Accessor.Db.Contracts.Responses;
using Accessor.Db.Services;
using Microsoft.AspNetCore.Mvc;

namespace Accessor.Db.Controllers;

[ApiController]
[Route("[controller]")]
public class InvoicesController(
    ILogger<InvoicesController> logger, 
    InvoicesService invoicesService) : ControllerBase
{
    [HttpGet("/invoices")]
    public async Task<ActionResult<List<InvoiceResponse>>> GetAllInvoices()
    {
        try
        {
            logger.LogInformation("Getting all invoices");

            var result = await invoicesService.GetAllInvoices();

            logger.LogInformation("Successfully retrieved all invoices");

            return result;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error occurred while getting all invoices");
            return Problem(ex.Message);
        }
    }

    [HttpGet("/invoice/{id}")]
    public async Task<ActionResult<InvoiceResponse?>> GetInvoice(int id)
    {
        try
        {
            logger.LogInformation("Getting invoice with ID: {Id}", id);

            var result = await invoicesService.GetInvoice(id);

            if (result is null)
            {
                logger.LogInformation("Invoice with ID: {Id} not found", id);
                return NoContent();
            }

            logger.LogInformation("Successfully retrieved invoice with ID: {Id}", id);

            return result;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error occurred while getting invoice with ID: {Id}", id);
            return Problem(ex.Message);
        }
    }

    [HttpPost("/update-invoice")]
    public async Task<ActionResult<InvoiceResponse>> UpdateInvoice([FromBody] InvoiceResponse invoice)
    {
        try
        {
            logger.LogInformation("Updating invoice with ID: {Id}", invoice.Id);

            var result = await invoicesService.UpdateInvoice(invoice);

            logger.LogInformation("Successfully updated invoice with ID: {Id}", invoice.Id);

            return result;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error occurred while updating invoice with ID: {Id}", invoice.Id);
            return Problem(ex.Message);
        }
    }

    [HttpPost("/add-invoice")]
    public async Task<ActionResult<InvoiceResponse>> AddInvoice([FromBody] NewInvoiceRequest invoice)
    {
        try
        {
            logger.LogInformation("Adding new invoice");

            var result = await invoicesService.AddInvoice(invoice);

            logger.LogInformation("Successfully added new invoice");

            return result;
        }
        catch (Exception ex)
        {
            logger.LogError(ex, "Error occurred while adding new invoice");
            return Problem(ex.Message);
        }
    }
}
