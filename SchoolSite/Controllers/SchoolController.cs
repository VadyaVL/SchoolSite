using SchoolSite.Domain.Core;
using SchoolSite.Infrastructure.Business;
using SchoolSite.Service;
using SchoolSite.Services.Interfaces;
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
        private ISchoolService schoolService;

        public SchoolController() : base()
        {
            schoolService = new SchoolService();
        }

        public ActionResult Index()
        {
            return View("school");
        }


        public ActionResult JSON_School(int miss = 0)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            
            return Json(schoolService.GetSchoolFeed(miss, 10), JsonRequestBehavior.AllowGet);
        }

        public ActionResult PostSchool(int id, String name)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");

            if (id == 0)
            {
                School s = new School();
                s.Name = name;

                schoolService.Save(s);
            }
            else
            {
                School fSchool = null;

                foreach (School sc in schoolService.GetAll())
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
                    schoolService.Update(fSchool);
                }
            }
            
            return Json(true, JsonRequestBehavior.AllowGet);
        }

        public ActionResult RemoveSchool(int id)
        {
            this.ControllerContext.HttpContext.Response.Headers.Add("Access-Control-Allow-Origin", "*");
            
            School fSchool = null;

            foreach(School sc in schoolService.GetAll())
            {
                if(sc.Id == id)
                {
                    fSchool = sc;
                    break;
                }
            }

            if (fSchool != null)
            {
                schoolService.Delete(fSchool.Id);
            }
            
            return Json(true, JsonRequestBehavior.AllowGet);
        }
    }
}