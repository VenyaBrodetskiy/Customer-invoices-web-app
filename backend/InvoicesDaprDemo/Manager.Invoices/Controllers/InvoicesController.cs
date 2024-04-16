using Dapr.Client;
using Manager.Invoices.Contracts.Requests;
using Manager.Invoices.Contracts.Responses;
using Microsoft.AspNetCore.Mvc;

namespace Manager.Invoices.Controllers;

[ApiController]
[Route("[controller]")]
public class InvoicesController : ControllerBase
{
    private readonly ILogger<InvoicesController> _logger;
    private readonly DaprClient _daprClient;

    public InvoicesController(ILogger<InvoicesController> logger, DaprClient daprClient)
    {
        _logger = logger;
        _daprClient = daprClient;
    }

    [HttpGet("/invoices")]
    public async Task<ActionResult<List<InvoiceResponse>>> GetAllInvoices()
    {
        try
        {
            var result = await _daprClient.InvokeMethodAsync<List<InvoiceResponse>>(
                HttpMethod.Get, "accessorDb", "/invoices");

            return result is null ? NotFound() : result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return Problem(ex.Message);
        }
    }

    [HttpPatch("/invoices")]
    public async Task<ActionResult<InvoiceResponse>> UpdateInvoice([FromBody] InvoiceRequest invoice)
    {
        try
        {
            var result = await _daprClient.InvokeMethodAsync<InvoiceResponse, InvoiceResponse>(
                "accessorDb", "/update-invoice", ToDto(invoice));

            return result is null ? Problem() : result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return Problem(ex.Message);
        }
    }

    [HttpPost("/invoices")]
    public async Task<ActionResult<InvoiceResponse>> AddInvoice([FromBody] NewInvoiceRequest invoice)
    {
        try
        {
            var result = await _daprClient.InvokeMethodAsync<NewInvoiceRequest, InvoiceResponse>(
                "accessorDb", "/add-invoice", invoice);

            return result is null ? Problem() : result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return Problem(ex.Message);
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
