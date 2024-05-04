using Dapr;
using Dapr.Client;
using Manager.Invoices.Contracts.Requests;
using Manager.Invoices.Contracts.Responses;
using Microsoft.AspNetCore.Mvc;
using System.Net;

namespace Manager.Invoices.Controllers;

[ApiController]
[Route("[controller]")]
public class InvoicesController(ILogger<InvoicesController> logger, DaprClient daprClient) : ControllerBase
{
    private readonly ILogger<InvoicesController> _logger = logger;
    private readonly DaprClient _daprClient = daprClient;

    [HttpGet("/invoices")]
    public async Task<ActionResult<List<InvoiceResponse>>> GetAllInvoices()
    {
        try
        {
            _logger.LogInformation("Getting all invoices");

            var result = await _daprClient.InvokeMethodAsync<List<InvoiceResponse>>(
                HttpMethod.Get, "accessorDb", "/invoices");

            return result is null ? NoContent() : result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting all invoices");
            return Problem();
        }
    }

    [HttpGet("/invoices/{id}")]
    public async Task<ActionResult<InvoiceResponse>> GetInvoice(int id)
    {
        try
        {
            _logger.LogInformation("Getting invoice with ID: {Id}", id);

            var result = await _daprClient.InvokeMethodAsync<InvoiceResponse>(
                HttpMethod.Get, "accessorDb", $"/invoice/{id}");

            return result;
        }
        catch (InvocationException ex) when (ex.Response.StatusCode == HttpStatusCode.NoContent)
        {
            _logger.LogInformation("Invoice with ID: {Id} not found", id);
            return NoContent();
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while getting invoice with ID: {Id}", id);
            return Problem();
        }
    }

    [HttpPatch("/invoices")]
    public async Task<ActionResult<InvoiceResponse>> UpdateInvoice([FromBody] InvoiceRequest invoice)
    {
        try
        {
            _logger.LogInformation("Updating invoice with ID: {Id}", invoice.Id);

            var result = await _daprClient.InvokeMethodAsync<InvoiceResponse, InvoiceResponse>(
                "accessorDb", "/update-invoice", ToDto(invoice));

            return result is null ? BadRequest() : result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while updating invoice with ID: {Id}", invoice.Id);
            return Problem();
        }
    }

    [HttpPost("/invoices")]
    public async Task<ActionResult<InvoiceResponse>> AddInvoice([FromBody] NewInvoiceRequest invoice)
    {
        try
        {
            _logger.LogInformation("Adding a new invoice");

            var result = await _daprClient.InvokeMethodAsync<NewInvoiceRequest, InvoiceResponse>(
                "accessorDb", "/add-invoice", invoice);

            return result is null ? BadRequest() : result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex, "An error occurred while adding a new invoice");
            return Problem();
        }
    }

    private static InvoiceResponse ToDto(InvoiceRequest invoice)
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
