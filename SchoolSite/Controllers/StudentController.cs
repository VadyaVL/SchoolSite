using SchoolSite.Domain.Core;
using SchoolSite.Infrastructure.Business;
using SchoolSite.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolSite.Controllers
{
    public class StudentController : Controller
    {
        private IStudentService studentService;
        private ISubjectService subjectService;

        public StudentController(IStudentService stS, ISubjectService suS) : base()
        {
            studentService = stS;
            subjectService = suS;
        }

        // GET: Student
        public ActionResult Index()
        {
            return View("Student");
        }

        public ActionResult JSON_ALL_Student()
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            return Json(studentService.GetStudentFeed(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult JSON_Student(bool get = false, int count = 0)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            if (get)
                return Json(studentService.GetStudentFeed(count + 10), JsonRequestBehavior.AllowGet);
            else
                return Json(studentService.GetStudentFeed(count), JsonRequestBehavior.AllowGet);
        }
        
        public ActionResult PostStudent(int id, String firstName, String lastName, int age, int schoolId, string subjects)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            var subs = subjects.Split(',').Select(x => Int32.Parse(x)).ToArray();

            if (id == 0)
            {
                Student s = new Student();
                s.FirstName = firstName;
                s.LastName = lastName;
                s.Age = age;
                s.SchoolId = schoolId;
                
                s.Subjects = new List<Subject>();

                foreach(int i in subs)
                {
                    s.Subjects.Add(subjectService.Get(i));
                }

                studentService.Save(s);
            }
            else
            {
                Student fStudent = studentService.GetAll().Find(i => i.Id == id);

                if (fStudent != null)
                {
                    fStudent.FirstName = firstName;
                    fStudent.LastName = lastName;
                    fStudent.Age = age;
                    fStudent.SchoolId = schoolId;
                    studentService.Update(fStudent);

                    fStudent.Subjects = new List<Subject>();

                    foreach (int i in subs)
                    {
                        fStudent.Subjects.Add(subjectService.Get(i));
                    }


                }
            }
            
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveStudent(int id)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            Student fStudent = studentService.GetAll().Find(i => i.Id == id);
            
            if (fStudent != null)
            {
                studentService.Delete(fStudent.Id);
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}