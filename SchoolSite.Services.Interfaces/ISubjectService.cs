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
    public interface ISubjectService
    {
        List<SubjectViewModel> GetAll();
        void Save(SubjectViewModel item);
        SubjectViewModel Get(int id);
        Subject GetSubject(int id);
        void Delete(int id);
        void Update(SubjectViewModel item);
        Feed<SubjectViewModel> GetSubjectFeed(int take);
        Feed<SubjectViewModel> GetSubjectFeed();
    }
}
