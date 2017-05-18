using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolSite.Domain.Core.DTO
{
    public class MarkCreateUpdateModel
    {
        public int Id { get; set; }
        public float Value { get; set; }
        public int StudentId { get; set; }
        public int SubjectId { get; set; }
    }
}
