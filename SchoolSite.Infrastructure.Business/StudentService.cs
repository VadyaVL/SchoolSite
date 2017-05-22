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
        private UnitOfWork unitOfWork;
        private IMapper mapp;

        public StudentService(UnitOfWork unitOfWork, Mapper mapper)
        {
            this.unitOfWork = unitOfWork;
            mapp = mapper;
        }

        public List<StudentViewModel> GetAll()
        {
            var res = unitOfWork.Students.Query().ToList().Select(x => mapp.Map<StudentViewModel>(x)).ToList();
            return res;
        }

        public void Delete(int id)
        {
            if (this.GetAll().Find(i => i.Id == id) != null)
            {
                unitOfWork.Students.Delete(id);
                unitOfWork.Save();
            }
        }

        public void Save(StudentCreateUpdateModel item)
        {
            if (item.Id == 0)
            {
                Student student = mapp.Map<StudentCreateUpdateModel, Student>(item);
                unitOfWork.Students.Create(student);
                unitOfWork.Save();
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
                unitOfWork.Students.Update(student);
                unitOfWork.Save();
            }
        }

        public Feed<StudentViewModel> GetStudentFeed(int skip, int take)
        {
            var res = unitOfWork.Students.Query().OrderBy(x => x.Id).Skip(skip).Take(take).ToList().Select(x => mapp.Map<StudentViewModel>(x)).ToList();
            return new Feed<StudentViewModel>(res, skip);
        }

        public Feed<StudentViewModel> GetStudentFeed()
        {
            return new Feed<StudentViewModel>(GetAll());
        }

        public StudentViewModel Get(int id)
        {
            return mapp.Map<Student, StudentViewModel>(unitOfWork.Students.GetById(id));
        }

        public Student GetStudent(int id)
        {
            return unitOfWork.Students.GetById(id);
        }
    }
}
