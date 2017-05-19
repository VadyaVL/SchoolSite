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

        public ActionResult JSON_ALL_Student()
        {
            return Json(studentService.GetStudentFeed(), JsonRequestBehavior.AllowGet);
        }

        public ActionResult JSON_Student(bool get = false, int count = 0)
        {
            if (get)
                return Json(studentService.GetStudentFeed(count + 10), JsonRequestBehavior.AllowGet);
            else
                return Json(studentService.GetStudentFeed(count), JsonRequestBehavior.AllowGet);
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