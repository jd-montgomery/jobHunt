namespace WebApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Job")]
    public partial class Job
    {
        public Job()
        {
            Submissions = new HashSet<Submission>();
        }

        public int Id { get; set; }

        public int CompanyId { get; set; }

        public int? RecruiterId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [Required]
        public string Description { get; set; }

        public bool IsClosed { get; set; }

        public virtual Company Company { get; set; }

        public virtual Recruiter Recruiter { get; set; }

        public virtual ICollection<Submission> Submissions { get; set; }
    }
}
