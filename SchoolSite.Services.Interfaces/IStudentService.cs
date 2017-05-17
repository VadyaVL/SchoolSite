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
    public interface IStudentService
    {
        List<Student> GetAll();
        void Save(Student item);
        Student Get(int id);
        void Delete(int id);
        void Update(Student item);
        Feed<StudentViewModel> GetStudentFeed(int take);
        Feed<Student> GetStudentFeed();
    }
}
