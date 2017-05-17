using SchoolSite.Domain.Core;
using SchoolSite.Infrastructure.Data;
using SchoolSite.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolSite.Service;
using AutoMapper;
using SchoolSite.Domain.DTO;

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
            uof.Students.Delete(id);
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

        public Feed<StudentViewModel> GetStudentFeed(int take)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Student, StudentViewModel>());
            List<StudentViewModel> users = Mapper.Map<List<Student>, List<StudentViewModel>>(uof.Students.GetAll().Take(take).ToList());

            return new Feed<StudentViewModel>(users);
        }

        public Feed<Student> GetStudentFeed()
        {
            List<Student> all = uof.Students.GetAll().ToList();

            return new Feed<Student>(all);
        }

        public Student Get(int id)
        {
            return uof.Students.GetById(id);
        }
    }
}
