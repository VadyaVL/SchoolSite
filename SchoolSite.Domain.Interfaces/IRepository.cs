using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace SchoolSite.Domain.Interfaces
{
    public interface IRepository<T> : IDisposable
    {
        IEnumerable<T> GetAll();
        T GetById(int id);
        void Create(T item);
        void Update(T item);
        void Delete(int id);
        void Save();
        IQueryable<T> Query(params Expression<Func<T, object>>[] includes);
    }
}
