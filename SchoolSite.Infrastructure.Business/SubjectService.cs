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
        private UnitOfWork uof;
        private IMapper mapp;

        public SubjectService(UnitOfWork uof, Mapper mapper)
        {
            this.uof = uof;
            mapp = mapper;
        }

        public List<SubjectViewModel> GetAll()
        {
            return mapp.Map<List<Subject>, List<SubjectViewModel>>(uof.Subjects.GetAll().ToList());
        }

        public void Delete(int id)
        {
            uof.Subjects.Delete(id);
            uof.Save();
        }

        public void Save(SubjectViewModel item)
        {
            Subject subject = mapp.Map<SubjectViewModel, Subject>(item);

            uof.Subjects.Create(subject);
            uof.Save();
        }

        public void Update(SubjectViewModel item)
        {
            Subject subject = mapp.Map<SubjectViewModel, Subject>(item);
            
            uof.Subjects.Update(subject);
            uof.Save();
        }

        public Feed<SubjectViewModel> GetSubjectFeed(int take)
        {
           List<SubjectViewModel> all = mapp.Map<List<Subject>, List<SubjectViewModel>>(uof.Subjects.GetAll().Take(take).ToList());

            return new Feed<SubjectViewModel>(all);
        }

        public Feed<SubjectViewModel> GetSubjectFeed()
        {
            return new Feed<SubjectViewModel>(mapp.Map<List<SubjectViewModel>>(uof.Subjects.GetAll().ToList()));
        }

        public SubjectViewModel Get(int id)
        {
            return mapp.Map<Subject, SubjectViewModel>(uof.Subjects.GetById(id));
        }

        public Subject GetSubject(int id)
        {
            return uof.Subjects.GetById(id);
        }
    }
}
