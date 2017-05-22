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
    public class SubjectService : ISubjectService
    {
        private UnitOfWork unitOfWork;
        private IMapper mapp;

        public SubjectService(UnitOfWork unitOfWork, Mapper mapper)
        {
            this.unitOfWork = unitOfWork;
            mapp = mapper;
        }

        public List<SubjectViewModel> GetAll()
        {
            var res = unitOfWork.Subjects.Query().ToList().Select(x => mapp.Map<SubjectViewModel>(x)).ToList();
            return res;
        }

        public void Delete(int id)
        {
            if (this.GetAll().Find(i => i.Id == id) != null)
            {
                unitOfWork.Subjects.Delete(id);
                unitOfWork.Save();
            }
        }

        public void Save(SubjectViewModel item)
        {
            if (item.Id == 0)
            {
                Subject subject = mapp.Map<SubjectViewModel, Subject>(item);
                unitOfWork.Subjects.Create(subject);
                unitOfWork.Save();
            }
            else
            {
                this.Update(item);
            }
        }

        public void Update(SubjectViewModel item)
        {
            if (this.GetAll().Find(i => i.Id == item.Id) != null)
            {
                Subject subject = mapp.Map<SubjectViewModel, Subject>(item);
                unitOfWork.Subjects.Update(subject);
                unitOfWork.Save();
            }
        }

        public Feed<SubjectViewModel> GetSubjectFeed(int skip, int take)
        {
            var res = unitOfWork.Subjects.Query().OrderBy(x => x.Id).Skip(skip).Take(take).ToList().Select(x => mapp.Map<SubjectViewModel>(x)).ToList();
            return new Feed<SubjectViewModel>(res, skip);
        }

        public Feed<SubjectViewModel> GetSubjectFeed()
        {
            return new Feed<SubjectViewModel>(GetAll());
        }

        public SubjectViewModel Get(int id)
        {
            return mapp.Map<Subject, SubjectViewModel>(unitOfWork.Subjects.GetById(id));
        }

        public Subject GetSubject(int id)
        {
            return unitOfWork.Subjects.GetById(id);
        }
    }
}
