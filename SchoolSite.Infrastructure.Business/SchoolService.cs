using SchoolSite.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolSite.Domain.Core;
using SchoolSite.Infrastructure.Data;
using SchoolSite.Service;
using SchoolSite.Domain.DTO;
using AutoMapper;

namespace SchoolSite.Infrastructure.Business
{
    public class SchoolService : ISchoolService
    {
        private UnitOfWork uof;
        private IMapper mapp;

        public SchoolService(UnitOfWork uof, Mapper mapper)
        {
            this.uof = uof;
            mapp = mapper;
        }

        public void Delete(int id)
        {
            uof.Schools.Delete(id);
            uof.Save();
        }

        public List<SchoolViewModel> GetAll()
        {
            return mapp.Map<List<SchoolViewModel>>(uof.Schools.GetAll().ToList());
        }

        public Feed<SchoolViewModel> GetSchoolFeed(int take)
        {
            List<SchoolViewModel> all = mapp.Map<List<SchoolViewModel>>(uof.Schools.GetAll().Take(take).ToList());

            return new Feed<SchoolViewModel>(all);
        }

        public Feed<SchoolViewModel> GetSchoolFeed()
        {
            return new Feed<SchoolViewModel>(mapp.Map<List<SchoolViewModel>>(uof.Schools.GetAll().ToList()));
        }

        public void Save(SchoolViewModel item)
        {
            School user = mapp.Map<School>(item);

            uof.Schools.Create(user);
            uof.Save();
        }

        public void Update(SchoolViewModel item)
        {
            School user = mapp.Map<School>(item);

            uof.Schools.Update(user);
            uof.Save();
        }
    }
}
