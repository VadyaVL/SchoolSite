using SchoolSite.Domain.Core;
using SchoolSite.Domain.Core.DTO;
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
        List<MarkViewModel> GetAll();
        void Save(MarkCreateUpdateModel item);
        void Delete(int id);
        void Update(MarkCreateUpdateModel item);
        Feed<MarkViewModel> GetMarkFeed(int take);
        Feed<MarkViewModel> GetMarkFeed();
    }
}
