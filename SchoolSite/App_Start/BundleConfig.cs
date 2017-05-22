using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Optimization;
using System.Web.Optimization.React;

namespace SchoolSite.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {
            BundleTable.EnableOptimizations = false;

            bundles.Add(new BabelBundle("~/bundles/school").Include("~/Scripts/babel/main.jsx", "~/Scripts/babel/school.jsx"));
            bundles.Add(new BabelBundle("~/bundles/student").Include("~/Scripts/babel/main.jsx", "~/Scripts/babel/student.jsx"));
            bundles.Add(new BabelBundle("~/bundles/subject").Include("~/Scripts/babel/main.jsx", "~/Scripts/babel/subject.jsx"));
            bundles.Add(new BabelBundle("~/bundles/mark").Include("~/Scripts/babel/main.jsx", "~/Scripts/babel/mark.jsx"));
        }

    }
}