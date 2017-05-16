using SchoolSite.Domain.Core;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SchoolSite.Infrastructure.Data
{
    public class SchoolDBContext : DbContext
    {

        private static SchoolDBContext _schoolDBContext = null;

        public static SchoolDBContext GetInstance()
        {
            if (_schoolDBContext == null)
            {
                _schoolDBContext = new SchoolDBContext();
            }

            return _schoolDBContext;
        }

        private SchoolDBContext() : base("name=SchoolDBCT")
        {
            this.Database.CreateIfNotExists();
            this.Configuration.ProxyCreationEnabled = false;
        }

        public DbSet<School> Schools { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Mark> Marks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            modelBuilder.HasDefaultSchema("SchoolDB");
            modelBuilder.Entity<Student>().HasRequired(p => p.School).WithMany(b => b.Students).HasForeignKey(p => p.SchoolId);
            modelBuilder.Entity<Mark>().HasRequired(p => p.Subject).WithMany(b => b.Marks).HasForeignKey(p => p.SubjectId);
            modelBuilder.Entity<Mark>().HasRequired(p => p.Student).WithMany(b => b.Marks).HasForeignKey(p => p.StudentId);

            modelBuilder.Entity<Student>().HasMany(st => st.Subjects).WithMany(su => su.Students).Map(mc =>
            {
                mc.ToTable("StudentJoinSubject");
                mc.MapLeftKey("Student_id");
                mc.MapRightKey("Subject_id");
            });
        }
    }
}
