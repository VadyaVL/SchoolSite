using SchoolSite.Domain.Core;
using SchoolSite.Domain.DTO;
using SchoolSite.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolSite.Services.Interfaces
{
    public interface IMarkService
    {
        List<Mark> GetAll();
        void Save(Mark item);
        void Delete(int id);
        void Update(Mark item);
        Feed<MarkViewModel> GetMarkFeed(int take);
        Feed<Mark> GetMarkFeed();
    }
}
