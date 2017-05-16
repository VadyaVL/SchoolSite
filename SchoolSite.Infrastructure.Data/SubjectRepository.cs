using SchoolSite.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolSite.Domain.Core;
using System.Data.Entity;

namespace SchoolSite.Infrastructure.Data
{
    public class SubjectRepository : IRepository<Subject>
    {
        private SchoolDBContext db;
        private bool disposed = false;

        public SubjectRepository()
        {
            this.db = SchoolDBContext.GetInstance();
        }

        public void Create(Subject item)
        {
            db.Subjects.Add(item);
        }

        public void Delete(int id)
        {
            Subject item = db.Subjects.Find(id);
            if (item != null)
                db.Subjects.Remove(item);
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

        public IEnumerable<Subject> GetAll()
        {
            return db.Subjects.ToList();
        }

        public Subject GetById(int id)
        {
            return db.Subjects.Find(id);
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(Subject item)
        {
            db.Entry(item).State = EntityState.Modified;
        }
    }
}
