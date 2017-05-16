﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolSite.Domain.Core
{
    public class Mark
    {
        public int Id { get; set; }
        public float Value { get; set; }

        public int StudentId { get; set; }
        public Student Student { get; set; }
        public int SubjectId { get; set; }
        public Subject Subject { get; set; }
    }
}