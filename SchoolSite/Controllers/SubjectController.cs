using SchoolSite.Domain.DTO;
using SchoolSite.Services.Interfaces;
using System.Web.Mvc;

namespace SchoolSite.Controllers
{
    public class SubjectController : Controller
    {
        private ISubjectService subjectService;

        public SubjectController(ISubjectService subjectService) : base()
        {
            this.subjectService = subjectService;
        }

        public ActionResult Index()
        {
            return View("subject");
        }
        
        public ActionResult JSON_ALL_Subject()
        {
            return Json(subjectService.GetSubjectFeed(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult JSON_Subject(bool get = false, int count = 0)
        {
            if (get)
                return Json(subjectService.GetSubjectFeed(count + 10), JsonRequestBehavior.AllowGet);
            else
                return Json(subjectService.GetSubjectFeed(count), JsonRequestBehavior.AllowGet);
        }

        public ActionResult PostSubject(SubjectViewModel svm)
        {
            subjectService.Save(svm);
            
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveSubject(int id)
        {
            subjectService.Delete(id);

            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}