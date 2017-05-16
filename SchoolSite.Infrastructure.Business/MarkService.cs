using SchoolSite.Domain.Core;
using SchoolSite.Infrastructure.Data;
using SchoolSite.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolSite.Service;

namespace SchoolSite.Infrastructure.Business
{
    public class MarkService : IMarkService
    {
        private UnitOfWork uof;

        public MarkService()
        {
            uof = new UnitOfWork();
        }

        public void Delete(int id)
        {
            uof.Marks.Delete(id);
            uof.Save();
        }

        public List<Mark> GetAll()
        {
            return (List<Mark>)uof.Marks.GetAll();
        }

        public Feed<Mark> GetMarkFeed(int miss, int take)
        {
            List<Mark> all = uof.Marks.GetAll().Skip(miss).Take(take).ToList();

            return new Feed<Mark>(all.Count, miss + take, all);
        }

        public void Save(Mark item)
        {
            uof.Marks.Create(item);
            uof.Save();
        }

        public void Update(Mark item)
        {
            uof.Marks.Update(item);
            uof.Save();
        }
    }
}
