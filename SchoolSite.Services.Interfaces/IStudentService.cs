using SchoolSite.Domain.Core;
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
        void Delete(int id);
        void Update(Student item);
        Feed<Student> GetStudentFeed(int miss, int take);
    }
}
