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

        public Feed<SubjectViewModel> GetSubjectFeed(int take)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Subject, SubjectViewModel>());
            List<SubjectViewModel> all = Mapper.Map<List<Subject>, List<SubjectViewModel>>(uof.Subjects.GetAll().Take(take).ToList());

            return new Feed<SubjectViewModel>(all);
        }

        public Feed<Subject> GetSubjectFeed()
        {
            List<Subject> all = uof.Subjects.GetAll().ToList();

            return new Feed<Subject>(all);
        }

        public Subject Get(int id)
        {
            return uof.Subjects.GetById(id);
        }
    }
}
