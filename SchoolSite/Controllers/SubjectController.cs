using SchoolSite.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolSite.Controllers
{
    public class SubjectController : Controller
    {
        // GET: Subject
        public ActionResult Index()
        {
            return View("subject");
        }

        public ActionResult JSON_Subject()
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            return Json(SchoolDBContext.GetInstance().Subjects, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PostSubject(int id, String title)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            if (id == 0)
            {
                Subject s = new Subject();
                s.Title = title;

                SchoolDBContext.GetInstance().Subjects.Add(s);
            }
            else
            {
                Subject fSubject = null;

                foreach (Subject sb in SchoolDBContext.GetInstance().Subjects)
                {
                    if (sb.Id == id)
                    {
                        fSubject = sb;
                        break;
                    }
                }

                if (fSubject != null)
                {
                    fSubject.Title = title;
                }
            }
            SchoolDBContext.GetInstance().SaveChanges();

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveSubject(int id)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            Subject fSubject = null;

            foreach (Subject sb in SchoolDBContext.GetInstance().Subjects)
            {
                if (sb.Id == id)
                {
                    fSubject = sb;
                    break;
                }
            }

            if (fSubject != null)
            {
                SchoolDBContext.GetInstance().Subjects.Remove(fSubject);
                SchoolDBContext.GetInstance().SaveChanges();
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}