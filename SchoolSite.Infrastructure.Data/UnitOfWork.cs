using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolSite.Infrastructure.Data
{
    public class UnitOfWork : IDisposable
    {
        private SchoolDBContext db = SchoolDBContext.GetInstance();
        private MarkRepository markRepository;
        private StudentRepository studentRepository;
        private SchoolRepository schoolRepository;
        private SubjectRepository subjectRepository;

        private bool disposed = false;

        public MarkRepository Marks
        {
            get
            {
                if (markRepository == null)
                    markRepository = new MarkRepository(db);
                return markRepository;
            }
        }

        public StudentRepository Students
        {
            get
            {
                if (studentRepository == null)
                    studentRepository = new StudentRepository(db);
                return studentRepository;
            }
        }

        public SchoolRepository Schools
        {
            get
            {
                if (schoolRepository == null)
                    schoolRepository = new SchoolRepository(db);
                return schoolRepository;
            }
        }

        public SubjectRepository Subjects
        {
            get
            {
                if (subjectRepository == null)
                    subjectRepository = new SubjectRepository(db);
                return subjectRepository;
            }
        }

        public void Save()
        {
            db.SaveChanges();
        }

        public virtual void Dispose(bool disposing)
        {
            if (!this.disposed)
            {
                if (disposing)
                {
                    db.Dispose();
                }
                this.disposed = true;
            }
        }

        public void Dispose()
        {
            Dispose(true);
            GC.SuppressFinalize(this);
        }
    }
}
