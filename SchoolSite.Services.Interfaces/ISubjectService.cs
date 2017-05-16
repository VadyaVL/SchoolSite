using SchoolSite.Domain.Core;
using SchoolSite.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolSite.Services.Interfaces
{
    public interface ISubjectService
    {
        List<Subject> GetAll();
        void Save(Subject item);
        void Delete(int id);
        void Update(Subject item);
        Feed<Subject> GetSubjectFeed(int miss, int take);
    }
}
