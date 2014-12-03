namespace WebApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Submission")]
    public partial class Submission
    {
        public int Id { get; set; }

        public int JobId { get; set; }

        public int RecruiterId { get; set; }

        public decimal HourlyRate { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime SubmitDate { get; set; }

        public virtual Job Job { get; set; }

        public virtual Recruiter Recruiter { get; set; }
    }
}
