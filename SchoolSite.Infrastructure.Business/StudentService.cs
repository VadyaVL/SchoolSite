using SchoolSite.Domain.Core;
using SchoolSite.Infrastructure.Data;
using SchoolSite.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolSite.Service;
using SchoolSite.Domain.DTO;
using SchoolSite.Domain.Core.DTO;
using AutoMapper;

namespace SchoolSite.Infrastructure.Business
{
    public class StudentService : IStudentService
    {
        private UnitOfWork uof;
        private IMapper mapp;

        public StudentService(UnitOfWork uof, Mapper mapper)
        {
            this.uof = uof;
            mapp = mapper;
        }

        public List<StudentViewModel> GetAll()
        {
            return mapp.Map<List<Student>, List<StudentViewModel>>(uof.Students.GetAll().ToList());
        }

        public void Delete(int id)
        {
            if (this.GetAll().Find(i => i.Id == id) != null)
            {
                uof.Students.Delete(id);
                uof.Save();
            }
        }

        public void Save(StudentCreateUpdateModel item)
        {
            if (item.Id == 0)
            {
                Student student = mapp.Map<StudentCreateUpdateModel, Student>(item);
                uof.Students.Create(student);
                uof.Save();
            }
            else
            {
                this.Update(item);
            }
        }

        public void Update(StudentCreateUpdateModel item)
        {
            if (this.GetAll().Find(i => i.Id == item.Id) != null)
            {
                Student student = mapp.Map<StudentCreateUpdateModel, Student>(item);
                uof.Students.Update(student);
                uof.Save();
            }
        }

        public Feed<StudentViewModel> GetStudentFeed(int take)
        {
            List<StudentViewModel> users = mapp.Map<List<Student>, List<StudentViewModel>>(uof.Students.GetAll().Take(take).ToList());

            return new Feed<StudentViewModel>(users);
        }

        public Feed<StudentViewModel> GetStudentFeed()
        {
            return new Feed<StudentViewModel>(mapp.Map<List<StudentViewModel>>(uof.Students.GetAll().ToList()));
        }

        public StudentViewModel Get(int id)
        {
            return mapp.Map<Student, StudentViewModel>(uof.Students.GetById(id));
        }

        public Student GetStudent(int id)
        {
            return uof.Students.GetById(id);
        }
    }
}
