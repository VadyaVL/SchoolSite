using SchoolSite.Domain.Core.DTO;
using SchoolSite.Services.Interfaces;
using System.Web.Mvc;

namespace SchoolSite.Controllers
{
    public class StudentController : Controller
    {
        private IStudentService studentService;//upper case
        private ISubjectService subjectService;

        public StudentController(IStudentService studentService, ISubjectService subjectService) : base()//lowcase
        {
            this.studentService = studentService;
            this.subjectService = subjectService;
        }

        // GET: Student
        public ActionResult Index()
        {
            return View("Student");
        }

        public ActionResult GetStudentOptions()
        {
            var res = studentService.GetStudentFeed();
            return Json(res, JsonRequestBehavior.AllowGet);
        }

        public ActionResult GetStudent(int skip, int take = 0)
        {
            var res = studentService.GetStudentFeed(skip, take < 0 ? 0 : take);
            return Json(res, JsonRequestBehavior.AllowGet);
        }
        
        public ActionResult PostStudent(StudentCreateUpdateModel studentCUM)
        {
            studentService.Save(studentCUM);
            
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveStudent(int id)
        {
            studentService.Delete(id);
            
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}