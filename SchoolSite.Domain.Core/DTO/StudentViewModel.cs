using SchoolSite.Domain.Core;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolSite.Domain.DTO
{
    public class StudentViewModel
    {
        public int Id { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public int Age { get; set; }
        public School School { get; set; }
    }
}