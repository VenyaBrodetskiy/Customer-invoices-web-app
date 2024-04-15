namespace Accessor.Db.Models;

public partial class Invoice
{
    public int Id { get; set; }

    public string Name { get; set; } = null!;
    public string Status { get; set; } = null!;
    public int Amount { get; set; }
    public DateTime DateIssued { get; set; }
}
