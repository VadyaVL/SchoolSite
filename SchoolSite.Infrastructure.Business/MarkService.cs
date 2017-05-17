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
    public class MarkService : IMarkService
    {
        private UnitOfWork uof;

        public MarkService()
        {
            uof = new UnitOfWork();
        }

        public void Delete(int id)
        {
            uof.Marks.Delete(id);
            uof.Save();
        }

        public List<Mark> GetAll()
        {
            return (List<Mark>)uof.Marks.GetAll();
        }

        public Feed<MarkViewModel> GetMarkFeed(int take)
        {
            Mapper.Initialize(cfg => cfg.CreateMap<Mark, MarkViewModel>());
            List<MarkViewModel> all = Mapper.Map<List<Mark>, List<MarkViewModel>>(uof.Marks.GetAll().Take(take).ToList());

            return new Feed<MarkViewModel>(all);
        }

        public Feed<Mark> GetMarkFeed()
        {
            List<Mark> all = uof.Marks.GetAll().ToList();

            return new Feed<Mark>(all);
        }

        public void Save(Mark item)
        {
            uof.Marks.Create(item);
            uof.Save();
        }

        public void Update(Mark item)
        {
            uof.Marks.Update(item);
            uof.Save();
        }
    }
}
