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
    public class SubjectService : ISubjectService
    {
        private UnitOfWork uof;

        public SubjectService()
        {
            uof = new UnitOfWork();
        }

        public List<Subject> GetAll()
        {
            return (List<Subject>)uof.Subjects.GetAll();
        }

        public void Delete(int id)
        {
            uof.Subjects.Delete(id);
            uof.Save();
        }

        public void Save(Subject item)
        {
            uof.Subjects.Create(item);
            uof.Save();
        }

        public void Update(Subject item)
        {
            uof.Subjects.Update(item);
            uof.Save();
        }

        public Feed<Subject> GetSubjectFeed(int miss, int take)
        {
            List<Subject> all = uof.Subjects.GetAll().Skip(miss).Take(take).ToList();

            return new Feed<Subject>(all.Count, miss + take, all);
        }
    }
}
