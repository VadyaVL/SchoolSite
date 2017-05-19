using SchoolSite.Domain.Core.DTO;
using SchoolSite.Services.Interfaces;
using System.Web.Mvc;

namespace SchoolSite.Controllers
{
    public class MarkController : Controller
    {
        private IMarkService markService;
        private IStudentService studentService;
        private ISubjectService subjectService;

        public MarkController(IMarkService markService, IStudentService studentService, ISubjectService subjectService) : base()
        {
            this.markService = markService;
            this.studentService = studentService;
            this.subjectService = subjectService;
        }


        public ActionResult Index()
        {
            return View("mark");
        }

        public ActionResult JSON_Mark(bool get = false, int count = 0)
        {
            if (get)
                return Json(markService.GetMarkFeed(count + 10), JsonRequestBehavior.AllowGet);
            else
                return Json(markService.GetMarkFeed(count), JsonRequestBehavior.AllowGet);
        }

        public ActionResult PostMark(MarkCreateUpdateModel markCUM)
        {
            markService.Save(markCUM);

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveMark(int id)
        {
            markService.Delete(id);

            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}