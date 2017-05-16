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

        public SubjectController() : base()
        {
            subjectService = new SubjectService();
        }
        // GET: Subject
        public ActionResult Index()
        {
            return View("subject");
        }

        public ActionResult JSON_Subject()
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            return Json(subjectService.GetSubjectFeed(0, 10), JsonRequestBehavior.AllowGet);
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