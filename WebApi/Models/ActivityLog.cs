namespace WebApi.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    [Table("ActivityLog")]
    public partial class ActivityLog
    {
        public int Id { get; set; }

        public int ActivityTypePK { get; set; }

        public int JobPK { get; set; }

        public string Notes { get; set; }

        [Column(TypeName = "datetime2")]
        public DateTime CreatedOnUTC { get; set; }
    }
}
