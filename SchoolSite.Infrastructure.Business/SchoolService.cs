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
        private UnitOfWork unitOfWork;
        private IMapper mapp;

        public SchoolService(UnitOfWork unitOfWork, Mapper mapper)
        {
            this.unitOfWork = unitOfWork;
            mapp = mapper;
        }

        public void Delete(int id)
        {

            if (this.GetAll().Find(i => i.Id == id) != null)
            {
                unitOfWork.Schools.Delete(id);
                unitOfWork.Save();
            }
        }

        public List<SchoolViewModel> GetAll()
        {
            var res = unitOfWork.Schools.Query().ToList().Select(x => mapp.Map<SchoolViewModel>(x)).ToList();
            return res;
        }

        public Feed<SchoolViewModel> GetSchoolFeed(int skip, int take)
        {
            var res = unitOfWork.Schools.Query().OrderBy(x=>x.Id).Skip(skip).Take(take).ToList().Select(x => mapp.Map<SchoolViewModel>(x)).ToList();

            return new Feed<SchoolViewModel>(res, skip);
        }

        public Feed<SchoolViewModel> GetSchoolFeed()
        {
            return new Feed<SchoolViewModel>(GetAll(), 10);
        }

        public void Save(SchoolViewModel item)
        {
            if (item.Id == 0)
            {
                School user = mapp.Map<School>(item);
                unitOfWork.Schools.Create(user);
                unitOfWork.Save();
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
                unitOfWork.Schools.Update(user);
                unitOfWork.Save();
            }
        }
    }
}
