using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;

namespace SchoolSite.Models
{
    public class SchoolDBContext : DbContext
    {
        public SchoolDBContext() : base("name=SchoolDBCT")
        {

        }
        
        public DbSet<School> Schools { get; set; }
        public DbSet<Student> Students { get; set; }
        public DbSet<Subject> Subjects { get; set; }
        public DbSet<Mark> Marks { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        {
            //modelBuilder.HasDefaultSchema("SchoolDB");
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