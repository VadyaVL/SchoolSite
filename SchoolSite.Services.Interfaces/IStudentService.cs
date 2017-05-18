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
    public interface IStudentService
    {
        List<StudentViewModel> GetAll();
        void Save(StudentCreateUpdateModel item);
        StudentViewModel Get(int id);
        Student GetStudent(int id);
        void Delete(int id);
        void Update(StudentCreateUpdateModel item);
        Feed<StudentViewModel> GetStudentFeed(int take);
        Feed<StudentViewModel> GetStudentFeed();
    }
}
