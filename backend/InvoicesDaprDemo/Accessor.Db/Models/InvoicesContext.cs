using Microsoft.EntityFrameworkCore;

namespace Accessor.Db.Models;

public partial class InvoicesContext : DbContext
{
    public InvoicesContext()
    {
    }

    public InvoicesContext(DbContextOptions<InvoicesContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Invoice> Invoices { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        => optionsBuilder.LogTo(Console.WriteLine, LogLevel.Error);

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Invoice>(entity =>
        {
            entity
                .HasKey(e => e.Id)
                .HasName("PK_Invoices"); // Naming the primary key

            entity.ToTable("invoices");

            entity.Property(e => e.Id)
                .ValueGeneratedOnAdd()
                .HasColumnName("id");
            entity.Property(e => e.Name)
                .IsRequired()
                .HasMaxLength(50)
                .HasColumnName("name");

            entity.Property(e => e.Status)
                .IsRequired()
                .HasColumnName("status")
                .HasColumnType("nvarchar(50)");

            entity.Property(e => e.Amount)
                .IsRequired()
                .HasColumnName("amount")
                .HasColumnType("int");

            entity.Property(e => e.DateIssued)
                .IsRequired()
                .HasColumnName("date_issued")
                .HasColumnType("datetime2");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
