using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolSite.Models
{
    public class Subject
    {
        public int Id { get; set; }
        public string Title { get; set; }

        public virtual ICollection<Student> Students { get; set; }
        public virtual ICollection<Mark> Marks { get; set; }
    }
}