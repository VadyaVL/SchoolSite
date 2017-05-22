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
        private UnitOfWork unitOfWork;
        private IMapper mapp;

        public MarkService(UnitOfWork unitOfWork, Mapper mapper)
        {
            this.unitOfWork = unitOfWork;
            mapp = mapper;
        }

        public void Delete(int id)
        {
            if (this.GetAll().Find(i => i.Id == id) != null)
            {
                unitOfWork.Marks.Delete(id);
                unitOfWork.Save();
            }
        }

        public List<MarkViewModel> GetAll()
        {
            var res = unitOfWork.Marks.Query().ToList().Select(x => mapp.Map<MarkViewModel>(x)).ToList();
            return res;
        }

        public Feed<MarkViewModel> GetMarkFeed(int skip, int take)
        {
            var res = unitOfWork.Marks.Query().OrderBy(x => x.Id).Skip(skip).Take(take).ToList().Select(x => mapp.Map<MarkViewModel>(x)).ToList();
            return new Feed<MarkViewModel>(res, skip);
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
                unitOfWork.Marks.Create(mark);
                unitOfWork.Save();
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
                unitOfWork.Marks.Update(mark);
                unitOfWork.Save();
            }
        }
    }
}
