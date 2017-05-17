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
        List<School> GetAll();
        void Save(School item);
        void Delete(int id);
        void Update(School item);
        Feed<SchoolViewModel> GetSchoolFeed(int take);
        Feed<School> GetSchoolFeed();
    }
}
