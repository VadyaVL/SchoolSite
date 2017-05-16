using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolSite.Domain.Core;

namespace SchoolSite.Service
{
    public class Feed<T>
    {
        private List<T> list;

        public int All { get; set; }
        public int Skip { get; set; }
        public List<T> Items { get; set; }
        

        public Feed(int all, int skip, List<T> list)
        {
            All = all;
            Skip = skip;
            this.Items = list;
        }
    }
}
