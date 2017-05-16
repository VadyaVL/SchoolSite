using SchoolSite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolSite.Controllers
{
    public class StudentController : Controller
    {
        // GET: Student
        public ActionResult Index()
        {
            return View("Student");
        }
        
        public ActionResult JSON_Student()
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            return Json(SchoolDBContext.GetInstance().Students, JsonRequestBehavior.AllowGet);
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

                SchoolDBContext.GetInstance().Students.Add(s);
            }
            else
            {
                Student fStudent = null;

                foreach (Student st in SchoolDBContext.GetInstance().Students)
                {
                    if (st.Id == id)
                    {
                        fStudent = st;
                        break;
                    }
                }

                if (fStudent != null)
                {
                    fStudent.FirstName = firstName;
                    fStudent.LastName = lastName;
                    fStudent.Age = age;
                    fStudent.SchoolId = schoolId;
                }
            }

            SchoolDBContext.GetInstance().SaveChanges();

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveStudent(int id)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            Student fStudent = null;

            foreach (Student st in SchoolDBContext.GetInstance().Students)
            {
                if (st.Id == id)
                {
                    fStudent = st;
                    break;
                }
            }

            if (fStudent != null)
            {
                SchoolDBContext.GetInstance().Students.Remove(fStudent);
                SchoolDBContext.GetInstance().SaveChanges();
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}