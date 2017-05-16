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
    public class StudentService : IStudentService
    {
        private UnitOfWork uof;

        public StudentService()
        {
            uof = new UnitOfWork();
        }
        
        public List<Student> GetAll()
        {
            return (List<Student>)uof.Students.GetAll();
        }

        public void Delete(int id)
        {
            uof.Schools.Delete(id);
            uof.Save();
        }

        public void Save(Student item)
        {
            uof.Students.Create(item);
            uof.Save();
        }

        public void Update(Student item)
        {
            uof.Students.Update(item);
            uof.Save();
        }

        public Feed<Student> GetStudentFeed(int miss, int take)
        {
            List<Student> all = uof.Students.GetAll().Skip(miss).Take(take).ToList();

            return new Feed<Student>(all.Count, miss + take, all);
        }
    }
}
