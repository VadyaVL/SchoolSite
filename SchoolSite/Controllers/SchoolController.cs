using SchoolSite.Domain.DTO;
using SchoolSite.Services.Interfaces;
using System.Web.Mvc;

namespace SchoolSite.Controllers
{
    public class SchoolController : Controller
    {
        private ISchoolService schoolService;

        public SchoolController(ISchoolService schoolService) : base()
        {
            this.schoolService = schoolService;
        }

        public ActionResult Index()
        {
            return View("school");
        }

        public ActionResult JSON_ALL_School()//GetSchoolOptions
        {
            var res = schoolService.GetSchoolFeed();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        // Get 
        public ActionResult JSON_School(int skip)//GetSchool
        {
            var res = schoolService.GetSchoolFeed(skip, 10);
            return Json(res, JsonRequestBehavior.AllowGet);
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