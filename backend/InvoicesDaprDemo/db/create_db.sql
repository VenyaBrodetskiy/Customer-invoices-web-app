USE [master]
GO
/****** Object:  Database [invoices]    Script Date: 4/16/2024 5:04:51 PM ******/
CREATE DATABASE [invoices]
 CONTAINMENT = NONE
 ON  PRIMARY 
( NAME = N'invoices', FILENAME = N'/var/opt/mssql/data/invoices.mdf' , SIZE = 8192KB , MAXSIZE = UNLIMITED, FILEGROWTH = 65536KB )
 LOG ON 
( NAME = N'invoices_log', FILENAME = N'/var/opt/mssql/data/invoices_log.ldf' , SIZE = 8192KB , MAXSIZE = 2048GB , FILEGROWTH = 65536KB )
 WITH CATALOG_COLLATION = DATABASE_DEFAULT
GO
ALTER DATABASE [invoices] SET COMPATIBILITY_LEVEL = 150
GO
IF (1 = FULLTEXTSERVICEPROPERTY('IsFullTextInstalled'))
begin
EXEC [invoices].[dbo].[sp_fulltext_database] @action = 'enable'
end
GO
ALTER DATABASE [invoices] SET ANSI_NULL_DEFAULT OFF 
GO
ALTER DATABASE [invoices] SET ANSI_NULLS OFF 
GO
ALTER DATABASE [invoices] SET ANSI_PADDING OFF 
GO
ALTER DATABASE [invoices] SET ANSI_WARNINGS OFF 
GO
ALTER DATABASE [invoices] SET ARITHABORT OFF 
GO
ALTER DATABASE [invoices] SET AUTO_CLOSE OFF 
GO
ALTER DATABASE [invoices] SET AUTO_SHRINK OFF 
GO
ALTER DATABASE [invoices] SET AUTO_UPDATE_STATISTICS ON 
GO
ALTER DATABASE [invoices] SET CURSOR_CLOSE_ON_COMMIT OFF 
GO
ALTER DATABASE [invoices] SET CURSOR_DEFAULT  GLOBAL 
GO
ALTER DATABASE [invoices] SET CONCAT_NULL_YIELDS_NULL OFF 
GO
ALTER DATABASE [invoices] SET NUMERIC_ROUNDABORT OFF 
GO
ALTER DATABASE [invoices] SET QUOTED_IDENTIFIER OFF 
GO
ALTER DATABASE [invoices] SET RECURSIVE_TRIGGERS OFF 
GO
ALTER DATABASE [invoices] SET  DISABLE_BROKER 
GO
ALTER DATABASE [invoices] SET AUTO_UPDATE_STATISTICS_ASYNC OFF 
GO
ALTER DATABASE [invoices] SET DATE_CORRELATION_OPTIMIZATION OFF 
GO
ALTER DATABASE [invoices] SET TRUSTWORTHY OFF 
GO
ALTER DATABASE [invoices] SET ALLOW_SNAPSHOT_ISOLATION OFF 
GO
ALTER DATABASE [invoices] SET PARAMETERIZATION SIMPLE 
GO
ALTER DATABASE [invoices] SET READ_COMMITTED_SNAPSHOT OFF 
GO
ALTER DATABASE [invoices] SET HONOR_BROKER_PRIORITY OFF 
GO
ALTER DATABASE [invoices] SET RECOVERY FULL 
GO
ALTER DATABASE [invoices] SET  MULTI_USER 
GO
ALTER DATABASE [invoices] SET PAGE_VERIFY CHECKSUM  
GO
ALTER DATABASE [invoices] SET DB_CHAINING OFF 
GO
ALTER DATABASE [invoices] SET FILESTREAM( NON_TRANSACTED_ACCESS = OFF ) 
GO
ALTER DATABASE [invoices] SET TARGET_RECOVERY_TIME = 60 SECONDS 
GO
ALTER DATABASE [invoices] SET DELAYED_DURABILITY = DISABLED 
GO
ALTER DATABASE [invoices] SET ACCELERATED_DATABASE_RECOVERY = OFF  
GO
EXEC sys.sp_db_vardecimal_storage_format N'invoices', N'ON'
GO
ALTER DATABASE [invoices] SET QUERY_STORE = OFF
GO
USE [invoices]
GO
/****** Object:  Table [dbo].[__EFMigrationsHistory]    Script Date: 4/16/2024 5:04:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[__EFMigrationsHistory](
	[MigrationId] [nvarchar](150) NOT NULL,
	[ProductVersion] [nvarchar](32) NOT NULL,
 CONSTRAINT [PK___EFMigrationsHistory] PRIMARY KEY CLUSTERED 
(
	[MigrationId] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
/****** Object:  Table [dbo].[invoices]    Script Date: 4/16/2024 5:04:51 PM ******/
SET ANSI_NULLS ON
GO
SET QUOTED_IDENTIFIER ON
GO
CREATE TABLE [dbo].[invoices](
	[id] [int] IDENTITY(1,1) NOT NULL,
	[name] [nvarchar](50) NOT NULL,
	[status] [nvarchar](50) NOT NULL,
	[amount] [int] NOT NULL,
	[date_issued] [datetime2](7) NOT NULL,
 CONSTRAINT [PK_Invoices] PRIMARY KEY CLUSTERED 
(
	[id] ASC
)WITH (PAD_INDEX = OFF, STATISTICS_NORECOMPUTE = OFF, IGNORE_DUP_KEY = OFF, ALLOW_ROW_LOCKS = ON, ALLOW_PAGE_LOCKS = ON, OPTIMIZE_FOR_SEQUENTIAL_KEY = OFF) ON [PRIMARY]
) ON [PRIMARY]
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240415193028_ExtendInvoiceSchema', N'8.0.4')
GO
INSERT [dbo].[__EFMigrationsHistory] ([MigrationId], [ProductVersion]) VALUES (N'20240416140148_InvoiceAddPK', N'8.0.4')
GO
SET IDENTITY_INSERT [dbo].[invoices] ON 
GO
INSERT [dbo].[invoices] ([id], [name], [status], [amount], [date_issued]) VALUES (1, N'ChatGPT', N'Paid', 80, CAST(N'2024-04-01T00:00:00.0000000' AS DateTime2))
GO
INSERT [dbo].[invoices] ([id], [name], [status], [amount], [date_issued]) VALUES (2, N'Bituakh Leumi', N'Pending', 300, CAST(N'2024-04-15T00:00:00.0000000' AS DateTime2))
GO
INSERT [dbo].[invoices] ([id], [name], [status], [amount], [date_issued]) VALUES (3, N'Hebrew Class', N'Pending', 1000, CAST(N'2024-04-10T00:00:00.0000000' AS DateTime2))
GO
INSERT [dbo].[invoices] ([id], [name], [status], [amount], [date_issued]) VALUES (4, N'Call grandma', N'Overdue', 10, CAST(N'2024-03-18T00:00:00.0000000' AS DateTime2))
GO
SET IDENTITY_INSERT [dbo].[invoices] OFF
GO
USE [master]
GO
ALTER DATABASE [invoices] SET  READ_WRITE 
GO
