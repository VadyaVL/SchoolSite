using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Script.Serialization;

namespace SchoolSite.Models
{
    public class School
    {
        public int Id { get; set; }
        public string Name { get; set; }
        [ScriptIgnore]
        public virtual ICollection<Student> Students { get; set; }
    }
}