namespace WebApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ActivityType")]
    public partial class ActivityType
    {
        public ActivityType()
        {
            ActivityLogs = new HashSet<ActivityLog>();
        }

        public int Id { get; set; }

        [Required]
        [StringLength(25)]
        public string Activity { get; set; }

        public virtual ICollection<ActivityLog> ActivityLogs { get; set; }
    }
}
