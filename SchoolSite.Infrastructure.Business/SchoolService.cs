using SchoolSite.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolSite.Domain.Core;
using SchoolSite.Infrastructure.Data;
using SchoolSite.Service;
using AutoMapper;
using SchoolSite.Domain.DTO;

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

        public Feed<SchoolViewModel> GetSchoolFeed(int take)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<School, SchoolViewModel>());
            List<SchoolViewModel> all = Mapper.Map<List<School>, List<SchoolViewModel>>(uof.Schools.GetAll().Take(take).ToList());

            return new Feed<SchoolViewModel>(all);
        }

        public Feed<School> GetSchoolFeed()
        {
            List<School> all = uof.Schools.GetAll().ToList();

            return new Feed<School>(all);
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
