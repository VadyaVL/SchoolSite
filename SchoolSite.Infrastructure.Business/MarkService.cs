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
using SchoolSite.Domain.Core.DTO;

namespace SchoolSite.Infrastructure.Business
{
    public class MarkService : IMarkService
    {
        private UnitOfWork uof;
        private IMapper mapp;

        public MarkService(UnitOfWork uof, Mapper mapper)
        {
            this.uof = uof;
            mapp = mapper;
        }

        public void Delete(int id)
        {
            uof.Marks.Delete(id);
            uof.Save();
        }

        public List<MarkViewModel> GetAll()
        {
            return mapp.Map<List<MarkViewModel>>(uof.Marks.GetAll().ToList());
        }

        public Feed<MarkViewModel> GetMarkFeed(int take)
        {
            return new Feed<MarkViewModel>(mapp.Map<List<MarkViewModel>>(uof.Marks.GetAll().Take(take).ToList()));
        }

        public Feed<MarkViewModel> GetMarkFeed()
        {
            return new Feed<MarkViewModel>(mapp.Map<List<MarkViewModel>>(uof.Marks.GetAll().ToList()));
        }

        public void Save(MarkCreateUpdateModel item)
        {
            Mark mark = mapp.Map<Mark>(item);

            uof.Marks.Create(mark);
            uof.Save();
        }

        public void Update(MarkCreateUpdateModel item)
        {
            Mark mark = mapp.Map<Mark>(item);

            uof.Marks.Update(mark);
            uof.Save();
        }
    }
}
