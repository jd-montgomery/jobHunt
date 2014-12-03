namespace WebApi.Models
{
	using System;
	using System.Data.Entity;
	using System.ComponentModel.DataAnnotations.Schema;
	using System.Linq;

	public partial class JobHuntDbContext : DbContext
	{
		public JobHuntDbContext()
			: base("name=JobHuntDbContext")
		{
		}

		public virtual DbSet<Company> Companies { get; set; }
		public virtual DbSet<Job> Jobs { get; set; }
		public virtual DbSet<Recruiter> Recruiters { get; set; }
		public virtual DbSet<Submission> Submissions { get; set; }
		public virtual DbSet<sysdiagram> sysdiagrams { get; set; }

		protected override void OnModelCreating(DbModelBuilder modelBuilder)
		{
			modelBuilder.Entity<Company>()
				.Property(e => e.Name)
				.IsUnicode(false);

			modelBuilder.Entity<Company>()
				.Property(e => e.WebSite)
				.IsUnicode(false);

			modelBuilder.Entity<Company>()
				.HasMany(e => e.Jobs)
				.WithRequired(e => e.Company)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Job>()
				.Property(e => e.Name)
				.IsUnicode(false);

			modelBuilder.Entity<Job>()
				.Property(e => e.Description)
				.IsUnicode(false);

			modelBuilder.Entity<Job>()
				.HasMany(e => e.Submissions)
				.WithRequired(e => e.Job)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Recruiter>()
				.Property(e => e.Name)
				.IsUnicode(false);

			modelBuilder.Entity<Recruiter>()
				.Property(e => e.Email)
				.IsUnicode(false);

			modelBuilder.Entity<Recruiter>()
				.Property(e => e.MainPhone)
				.IsUnicode(false);

			modelBuilder.Entity<Recruiter>()
				.HasMany(e => e.Employees)
				.WithOptional(e => e.WorksFor)
				.HasForeignKey(e => e.ParentId);

			modelBuilder.Entity<Recruiter>()
				.HasMany(e => e.Submissions)
				.WithRequired(e => e.Recruiter)
				.WillCascadeOnDelete(false);

			modelBuilder.Entity<Submission>()
				.Property(e => e.HourlyRate)
				.HasPrecision(9, 2);
		}
	}
}
