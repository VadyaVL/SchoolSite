using SchoolSite.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolSite.Domain.DTO
{
    public class MarkViewModel
    {
        public int Id { get; set; }
        public float Value { get; set; }
        public StudentViewModel Student { get; set; }
        public SubjectViewModel Subject { get; set; }
    }
}