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
            if (this.GetAll().Find(i => i.Id == id) != null)
            {
                uof.Marks.Delete(id);
                uof.Save();
            }
        }

        public List<MarkViewModel> GetAll()
        {
            var res = uof.Marks.Query().ToList().Select(x => mapp.Map<MarkViewModel>(x)).ToList();
            return res;
        }

        public Feed<MarkViewModel> GetMarkFeed(int take)
        {
            var res = uof.Marks.Query().ToList().Select(x => mapp.Map<MarkViewModel>(x)).Take(take).ToList();
            return new Feed<MarkViewModel>(res);
        }

        public Feed<MarkViewModel> GetMarkFeed()
        {
            return new Feed<MarkViewModel>(GetAll());
        }

        public void Save(MarkCreateUpdateModel item)
        {
            if (item.Id == 0)
            {
                Mark mark = mapp.Map<Mark>(item);
                uof.Marks.Create(mark);
                uof.Save();
            }
            else
            {
                this.Update(item);
            }
        }

        public void Update(MarkCreateUpdateModel item)
        {
            if (this.GetAll().Find(i => i.Id == item.Id) != null)
            {
                Mark mark = mapp.Map<Mark>(item);
                uof.Marks.Update(mark);
                uof.Save();
            }
        }
    }
}
