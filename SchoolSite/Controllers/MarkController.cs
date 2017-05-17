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
    public class MarkController : Controller
    {

        private IMarkService markService;
        private IStudentService studentService;
        private ISubjectService subjectService;

        public MarkController() : base()
        {
            markService = new MarkService();
            studentService = new StudentService();
            subjectService = new SubjectService();
        }

        // GET: Mark
        public ActionResult Index()
        {
            return View("mark");
        }

        public ActionResult JSON_Mark(bool get = false, int count = 0)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            if (get)
                return Json(markService.GetMarkFeed(count + 10), JsonRequestBehavior.AllowGet);
            else
                return Json(markService.GetMarkFeed(count), JsonRequestBehavior.AllowGet);
        }

        public ActionResult PostMark(int id, int student_id, int subject_id, int value)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            if (id == 0)
            {
                Mark m = new Mark();
                m.Student = studentService.Get(student_id);
                m.Subject = subjectService.Get(subject_id);
                m.Value = value;

                markService.Save(m);
            }
            else
            {
                Mark fMark = null;

                foreach (Mark m in markService.GetAll())
                {
                    if (m.Id == id)
                    {
                        fMark = m;
                        break;
                    }
                }

                if (fMark != null)
                {
                    fMark.Student = studentService.Get(student_id);
                    fMark.Subject = subjectService.Get(subject_id);
                    fMark.Value = value;
                    markService.Update(fMark);
                }
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveMark(int id)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            Mark fMark = null;

            foreach (Mark m in markService.GetAll())
            {
                if (m.Id == id)
                {
                    fMark = m;
                    break;
                }
            }

            if (fMark != null)
            {
                markService.Delete(fMark.Id);
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}