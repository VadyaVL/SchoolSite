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

            if (this.GetAll().Find(i => i.Id == id) != null)
            {
                uof.Schools.Delete(id);
                uof.Save();
            }
        }

        public List<SchoolViewModel> GetAll()
        {
            var res = uof.Schools.Query().ToList().Select(x => mapp.Map<SchoolViewModel>(x)).ToList();
            return res;
        }

        public Feed<SchoolViewModel> GetSchoolFeed(int take)
        {
            var res = uof.Schools.Query().ToList().Select(x => mapp.Map<SchoolViewModel>(x)).Take(take).ToList();

            return new Feed<SchoolViewModel>(res);
        }

        public Feed<SchoolViewModel> GetSchoolFeed()
        {
            return new Feed<SchoolViewModel>(GetAll());
        }

        public void Save(SchoolViewModel item)
        {
            if (item.Id == 0)
            {
                School user = mapp.Map<School>(item);
                uof.Schools.Create(user);
                uof.Save();
            }
            else
            {
                this.Update(item);
            }
        }

        public void Update(SchoolViewModel item)
        {
            if (this.GetAll().Find(i => i.Id == item.Id) != null)
            {
                School user = mapp.Map<School>(item);
                uof.Schools.Update(user);
                uof.Save();
            }
        }
    }
}
