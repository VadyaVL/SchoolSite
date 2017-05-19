using SchoolSite.Domain.DTO;
using SchoolSite.Services.Interfaces;
using System.Web.Mvc;

namespace SchoolSite.Controllers
{
    public class SchoolController : Controller
    {
        private ISchoolService schoolService;

        public SchoolController(ISchoolService ss) : base()
        {
            schoolService = ss;
        }

        public ActionResult Index()
        {
            return View("school");
        }

        public ActionResult JSON_ALL_School()
        {
            return Json(schoolService.GetSchoolFeed(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult JSON_School(bool get = false, int count = 0)
        {
            if(get)
                return Json(schoolService.GetSchoolFeed(count + 10), JsonRequestBehavior.AllowGet);
            else
                return Json(schoolService.GetSchoolFeed(count), JsonRequestBehavior.AllowGet);
        }

        public ActionResult PostSchool(SchoolViewModel dto)
        {
            schoolService.Save(dto);
            
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveSchool(int id)
        {
            schoolService.Delete(id);
            
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}