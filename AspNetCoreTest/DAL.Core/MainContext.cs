using System.Data.Common;
using DAL.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace DAL.Core
{
	public class MainContext : DbContext
	{
		public MainContext(DbContextOptions<MainContext> options) : base(options)
		{
		}

		public DbSet<Author> Authors { get; set; }
		public DbSet<Post> Posts { get; set; }

		protected override void OnModelCreating(ModelBuilder modelBuilder)
		{
			try
			{
				modelBuilder.Entity<Author>().HasMany(c => c.Posts)
					.WithOne(e => e.Author);
				modelBuilder.Entity<Post>().HasOne(x => x.Author).WithMany(y => y.Posts);
			}
			catch (DbException ex)
			{
				throw;
			}

		}
	}
}
