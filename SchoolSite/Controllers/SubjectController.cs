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
        
        public ActionResult GetSubjectOptions()
        {
            var res = subjectService.GetSubjectFeed();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetSubject(int skip, int take = 0)
        {
            var res = subjectService.GetSubjectFeed(skip, take < 0 ? 0 : take);
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PostSubject(SubjectViewModel subjectViewModel)
        {
            subjectService.Save(subjectViewModel);
            
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveSubject(int id)
        {
            subjectService.Delete(id);

            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}