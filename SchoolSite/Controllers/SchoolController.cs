using SchoolSite.Models;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolSite.Controllers
{
    public class SchoolController : Controller
    {

        private SchoolDBContext schoolDBContext = null;

        public SchoolController()
        {
            schoolDBContext = new SchoolDBContext();
            schoolDBContext.Database.CreateIfNotExists();

            //School s = new School();
            //s.Id = 1;
            //s.Name = "ЗОШ №5 Івана Франка";

            //schoolDBContext.Schools.Add(s);

            //schoolDBContext.SaveChanges();
        }
        
        public ActionResult Index()
        {
            return View();
        }


        public ActionResult JSON_School()
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            
            return Json(schoolDBContext.Schools, JsonRequestBehavior.AllowGet);
        }

        public ActionResult PostSchool(int id, String name)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            if (id == 0)
            {
                School s = new School();
                s.Name = name;

                schoolDBContext.Schools.Add(s);
            }
            else
            {
                School fSchool = null;

                foreach (School sc in schoolDBContext.Schools)
                {
                    if (sc.Id == id)
                    {
                        fSchool = sc;
                        break;
                    }
                }

                if (fSchool != null)
                {
                    fSchool.Name = name;
                }
            }
            schoolDBContext.SaveChanges();

            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveSchool(int id)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            School fSchool = null;

            foreach(School sc in schoolDBContext.Schools)
            {
                if(sc.Id == id)
                {
                    fSchool = sc;
                    break;
                }
            }

            if (fSchool != null)
            {
                schoolDBContext.Schools.Remove(fSchool);
                schoolDBContext.SaveChanges();
            }

            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}