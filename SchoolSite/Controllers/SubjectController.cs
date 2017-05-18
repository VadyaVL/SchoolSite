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
    public class SubjectController : Controller
    {
        private ISubjectService subjectService;

        public SubjectController(ISubjectService ss) : base()
        {
            subjectService = ss;
        }
        // GET: Subject
        public ActionResult Index()
        {
            return View("subject");
        }
        
        public ActionResult JSON_ALL_Subject()
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            return Json(subjectService.GetSubjectFeed(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult JSON_Subject(bool get = false, int count = 0)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            if (get)
                return Json(subjectService.GetSubjectFeed(count + 10), JsonRequestBehavior.AllowGet);
            else
                return Json(subjectService.GetSubjectFeed(count), JsonRequestBehavior.AllowGet);
        }

        public ActionResult PostSubject(int id, String title)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            if (id == 0)
            {
                Subject s = new Subject();
                s.Title = title;
                subjectService.Save(s);
            }
            else
            {
                Subject fSubject = subjectService.GetAll().Find(i => i.Id == id);

                if (fSubject != null)
                {
                    fSubject.Title = title;
                    subjectService.Update(fSubject);
                }
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveSubject(int id)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            Subject fSubject = subjectService.GetAll().Find(i => i.Id == id);

            if (fSubject != null)
            {
                subjectService.Delete(fSubject.Id);
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}