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

        public StudentController() : base()
        {
            studentService = new StudentService();
        }

        // GET: Student
        public ActionResult Index()
        {
            return View("Student");
        }
        
        public ActionResult JSON_Student()
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            
            return Json(studentService.GetStudentFeed(0, 10), JsonRequestBehavior.AllowGet);
        }

        public ActionResult PostStudent(int id, String firstName, String lastName, int age, int schoolId)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            if (id == 0)
            {
                Student s = new Student();
                s.FirstName = firstName;
                s.LastName = lastName;
                s.Age = age;
                s.SchoolId = schoolId;

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