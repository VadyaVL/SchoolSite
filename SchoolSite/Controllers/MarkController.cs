using SchoolSite.Domain.Core;
using SchoolSite.Domain.Core.DTO;
using SchoolSite.Domain.DTO;
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

        public MarkController(IMarkService ms, IStudentService stS, ISubjectService suS) : base()
        {
            markService = ms;
            studentService = stS;
            subjectService = suS;
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
                MarkCreateUpdateModel m = new MarkCreateUpdateModel();
                m.StudentId = student_id;
                m.SubjectId = subject_id;
                m.Value = value;

                markService.Save(m);
            }
            else
            {

                MarkCreateUpdateModel fMark = new MarkCreateUpdateModel();
                
                if (fMark != null)
                {
                    fMark.StudentId = student_id;
                    fMark.SubjectId = subject_id;
                    fMark.Value = value;
                    markService.Update(fMark);
                }
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveMark(int id)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            MarkViewModel fMark = null;

            foreach (MarkViewModel m in markService.GetAll())
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