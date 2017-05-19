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
    public interface ISchoolService
    {
        List<SchoolViewModel> GetAll();
        void Save(SchoolViewModel item);
        void Delete(int id);
        void Update(SchoolViewModel item);
        Feed<SchoolViewModel> GetSchoolFeed(int skip, int take);
        Feed<SchoolViewModel> GetSchoolFeed();
    }
}
