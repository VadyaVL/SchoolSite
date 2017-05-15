using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolSite.Models
{
    public class Student
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }

        public int SchoolId { get; set; }
        public School School { get; set; }

        public virtual ICollection<Subject> Subjects { get; set; }
        public virtual ICollection<Mark> Marks { get; set; }
    }
}