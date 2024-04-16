using Dapr.Client;
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

    [HttpPatch("/invoices/{id}")]
    public async Task<ActionResult<bool>> UpdateInvoice(string id)
    {
        try
        {
            await Task.Delay(1);
            return Ok();
            //var result = await _daprClient.InvokeMethodAsync<List<InvoiceResponse>>(
            //    HttpMethod.Get, "accessorDb", "/invoices");

            //return result is null ? NotFound() : result;
        }
        catch (Exception ex)
        {
            _logger.LogError(ex.Message);
            return Problem(ex.Message);
        }
    }
}
