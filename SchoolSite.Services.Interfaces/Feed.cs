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
        public int Count { get; set; }
        public List<T> Items { get; set; }
        

        public Feed(List<T> list)
        {
            Count = list.Count;
            this.Items = list;
        }
    }
}
