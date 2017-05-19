using SchoolSite.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolSite.Domain.Core;
using System.Data.Entity;
using System.Linq.Expressions;

namespace SchoolSite.Infrastructure.Data
{
    public class StudentRepository : IRepository<Student>
    {

        private SchoolDBContext db;
        private bool disposed = false;

        public StudentRepository(SchoolDBContext db)
        {
            this.db = db;
        }

        public virtual IQueryable<Student> Query(params Expression<Func<Student, object>>[] includes)
        {
            IQueryable<Student> query = db.Students;

            foreach (Expression<Func<Student, object>> include in includes)
                query = query.Include(include);

            return query;
        }

        public void Create(Student item)
        {
            db.Students.Add(item);
        }

        public void Delete(int id)
        {
            Student item = db.Students.Find(id);
            if (item != null)
                db.Students.Remove(item);
        }

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
            }
            this.disposed = true;
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }

        public IEnumerable<Student> GetAll()
        {
            return db.Students.ToList();
        }

        public Student GetById(int id)
        {
            return db.Students.Find(id);
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(Student item)
        {
            var itemInDb = db.Students.Find(item.Id);
            
            if (itemInDb == null)
            {
                db.Students.Add(item);
                return;
            }
            
            db.Entry(itemInDb).CurrentValues.SetValues(item);
            db.Entry(itemInDb).State = EntityState.Modified;
        }
    }
}
