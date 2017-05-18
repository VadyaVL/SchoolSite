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
using SchoolSite.Domain.Core.DTO;

namespace SchoolSite.Infrastructure.Business
{
    public class StudentService : IStudentService
    {
        private UnitOfWork uof;

        public StudentService()
        {
            uof = new UnitOfWork();
        }
        
        public List<StudentViewModel> GetAll()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Student, StudentViewModel>());

            return Mapper.Map<List<Student>, List<StudentViewModel>>(uof.Students.GetAll().ToList());
        }

        public void Delete(int id)
        {
            uof.Students.Delete(id);
            uof.Save();
        }

        public void Save(StudentCreateUpdateModel item)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<StudentCreateUpdateModel, Student>());
            Student student = Mapper.Map<StudentCreateUpdateModel, Student>(item);

            uof.Students.Create(student);
            uof.Save();
        }

        public void Update(StudentCreateUpdateModel item)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<StudentCreateUpdateModel, School>());
            Student student = Mapper.Map<StudentCreateUpdateModel, Student>(item);

            uof.Students.Update(student);
            uof.Save();
        }

        public Feed<StudentViewModel> GetStudentFeed(int take)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Student, StudentViewModel>());
            List<StudentViewModel> users = Mapper.Map<List<Student>, List<StudentViewModel>>(uof.Students.GetAll().Take(take).ToList());

            return new Feed<StudentViewModel>(users);
        }

        public Feed<StudentViewModel> GetStudentFeed()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Student, StudentViewModel>());
            return new Feed<StudentViewModel>(Mapper.Map<List<Student>, List<StudentViewModel>>(uof.Students.GetAll().ToList()));
        }

        public StudentViewModel Get(int id)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Student, StudentViewModel>());
            return Mapper.Map<Student, StudentViewModel>(uof.Students.GetById(id));
        }

        public Student GetStudent(int id)
        {
            return uof.Students.GetById(id);
        }
    }
}
