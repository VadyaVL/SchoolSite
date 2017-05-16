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
    public class MarkRepository : IRepository<Mark>
    {

        private SchoolDBContext db;
        private bool disposed = false;

        public MarkRepository()
        {
            this.db = SchoolDBContext.GetInstance();
        }

        public void Create(Mark item)
        {
            db.Marks.Add(item);
        }

        public void Delete(int id)
        {
            Mark item = db.Marks.Find(id);
            if (item != null)
                db.Marks.Remove(item);
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

        public IEnumerable<Mark> GetAll()
        {
            return db.Marks.ToList();
        }

        public Mark GetById(int id)
        {
            return db.Marks.Find(id);
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(Mark item)
        {
            db.Entry(item).State = EntityState.Modified;
        }
    }
}
