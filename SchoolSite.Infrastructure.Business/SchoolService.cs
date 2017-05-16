using SchoolSite.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolSite.Domain.Core;
using SchoolSite.Infrastructure.Data;
using SchoolSite.Service;

namespace SchoolSite.Infrastructure.Business
{
    public class SchoolService : ISchoolService
    {
        private UnitOfWork uof;

        public SchoolService()
        {
            uof = new UnitOfWork();
        }

        public void Delete(int id)
        {
            uof.Schools.Delete(id);
            uof.Save();
        }

        public List<School> GetAll()
        {
            return (List<School>) uof.Schools.GetAll();
        }

        public Feed<School> GetSchoolFeed(int miss, int take)
        {
            List<School> all = uof.Schools.GetAll().Skip(miss).Take(take).ToList();

            return new Feed<School>(all.Count, miss + take, all);
        }

        public void Save(School item)
        {
            uof.Schools.Create(item);
            uof.Save();
        }

        public void Update(School item)
        {
            uof.Schools.Update(item);
            uof.Save();
        }
    }
}
