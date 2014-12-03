namespace WebApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("Company")]
    public partial class Company
    {
        public Company()
        {
            Jobs = new HashSet<Job>();
        }

        public int Id { get; set; }

        public int? RecruiterId { get; set; }

        [Required]
        [StringLength(50)]
        public string Name { get; set; }

        [StringLength(50)]
        public string WebSite { get; set; }

        public virtual ICollection<Job> Jobs { get; set; }
    }
}
