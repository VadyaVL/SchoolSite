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

        public List<SchoolViewModel> GetAll()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<School, SchoolViewModel>());
            
            return Mapper.Map<List<School>, List<SchoolViewModel>>(uof.Schools.GetAll().ToList());
        }

        public Feed<SchoolViewModel> GetSchoolFeed(int take)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<School, SchoolViewModel>());
            List<SchoolViewModel> all = Mapper.Map<List<School>, List<SchoolViewModel>>(uof.Schools.GetAll().Take(take).ToList());

            return new Feed<SchoolViewModel>(all);
        }

        public Feed<SchoolViewModel> GetSchoolFeed()
        {
            Mapper.Initialize(cfg => cfg.CreateMap<School, SchoolViewModel>());
            //uof.Schools.Query(x => x.Students).Selec(x => Mapper.Map<School, SchoolViewModel>).Tolist();
            return new Feed<SchoolViewModel>(Mapper.Map<List<School>, List<SchoolViewModel>>(uof.Schools.GetAll().ToList()));
        }

        public void Save(SchoolViewModel item)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<SchoolViewModel, School>());
            School user = Mapper.Map<SchoolViewModel, School>(item);

            uof.Schools.Create(user);
            uof.Save();
        }

        public void Update(SchoolViewModel item)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<SchoolViewModel, School>());
            School user = Mapper.Map<SchoolViewModel, School>(item);

            uof.Schools.Update(user);
            uof.Save();
        }
    }
}
