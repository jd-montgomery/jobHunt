namespace WebApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Recruiter")]
    public partial class Recruiter
    {
        public Recruiter()
        {
            Jobs = new HashSet<Job>();
            Recruiter1 = new HashSet<Recruiter>();
            Submissions = new HashSet<Submission>();
        }

        public int Id { get; set; }

        public int? ParentId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(75)]
        public string Email { get; set; }

        [StringLength(50)]
        public string MainPhone { get; set; }

        public virtual ICollection<Job> Jobs { get; set; }

        public virtual ICollection<Recruiter> Recruiter1 { get; set; }

        public virtual Recruiter Recruiter2 { get; set; }

        public virtual ICollection<Submission> Submissions { get; set; }
    }
}
