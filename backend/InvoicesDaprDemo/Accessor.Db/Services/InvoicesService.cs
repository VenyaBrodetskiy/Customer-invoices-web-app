using Accessor.Db.Contracts.Requests;
using Accessor.Db.Contracts.Responses;
using Accessor.Db.Models;
using Microsoft.EntityFrameworkCore;

namespace Accessor.Db.Services;

public class InvoicesService(InvoicesContext db)
{
    public async Task<List<InvoiceResponse>> GetAllInvoices()
    {
        try
        {
            var result = await db.Invoices
                .Select(invoice => ToDto(invoice))
                .ToListAsync();

            return result;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<InvoiceResponse?> GetInvoice(int id)
    {
        try
        {
            var result = await db.Invoices
                .Where(invoice => invoice.Id == id)
                .Select(invoice => ToDto(invoice))
                .FirstOrDefaultAsync();

            return result;
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<InvoiceResponse> UpdateInvoice(InvoiceResponse invoice)
    {
        try
        {
            var invoiceToChange = await db.Invoices
                .Where(inv => inv.Id == invoice.Id)
                .FirstAsync();

            invoiceToChange.Status = invoice.Status;
            invoiceToChange.Amount = invoice.Amount;
            invoiceToChange.DateIssued = invoice.DateIssued;
            invoiceToChange.Name = invoice.Name;

            await db.SaveChangesAsync();

            return ToDto(invoiceToChange);
        }
        catch (Exception)
        {
            throw;
        }
    }

    public async Task<InvoiceResponse> AddInvoice(NewInvoiceRequest invoice)
    {
        try
        {
            var newInvoice = FromDto(invoice);
            db.Invoices.Add(newInvoice);

            await db.SaveChangesAsync();

            return ToDto(newInvoice);
        }
        catch (Exception)
        {
            throw;
        }
    }

    private static Invoice FromDto(NewInvoiceRequest invoice) => new()
    {
        Id = Const.NonExistId,
        Status = invoice.Status,
        Amount = invoice.Amount,
        DateIssued = invoice.DateIssued,
        Name = invoice.Name,
    };

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
