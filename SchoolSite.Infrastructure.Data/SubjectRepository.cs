﻿using SchoolSite.Domain.Interfaces;
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
    public class SubjectRepository : IRepository<Subject>
    {
        private SchoolDBContext db;
        private bool disposed = false;

        public SubjectRepository(SchoolDBContext db)
        {
            this.db = db;
        }
        
        public virtual IQueryable<Subject> Query(params Expression<Func<Subject, object>>[] includes)
        {
            IQueryable<Subject> query = db.Subjects;

            foreach (Expression<Func<Subject, object>> include in includes)
                query = query.Include(include);

            return query;
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
            var itemInDb = db.Subjects.Find(item.Id);

            if (itemInDb == null)
            {
                db.Subjects.Add(item);
                return;
            }

            db.Entry(itemInDb).CurrentValues.SetValues(item);
            db.Entry(itemInDb).State = EntityState.Modified;
        }
    }
}
