﻿using SchoolSite.Domain.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using SchoolSite.Domain.Core;
using System.Data.Entity;

namespace SchoolSite.Infrastructure.Data
{
    public class SchoolRepository : IRepository<School>
    {
        private SchoolDBContext db;
        private bool disposed = false;

        public SchoolRepository()
        {
            this.db = SchoolDBContext.GetInstance();
        }

        public void Create(School item)
        {
            db.Schools.Add(item);
        }

        public void Delete(int id)
        {
            School item = db.Schools.Find(id);
            if (item != null)
                db.Schools.Remove(item);
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

        public IEnumerable<School> GetAll()
        {
            return db.Schools.ToList();
        }

        public School GetById(int id)
        {
            return db.Schools.Find(id);
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public void Update(School item)
        {
            db.Entry(item).State = EntityState.Modified;
        }
    }
}