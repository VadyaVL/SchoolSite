using Autofac;
using Autofac.Integration.Mvc;
using SchoolSite.Domain.Core;
using SchoolSite.Domain.Interfaces;
using SchoolSite.Infrastructure.Business;
using SchoolSite.Infrastructure.Data;
using SchoolSite.Services.Interfaces;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace SchoolSite.Util
{
    public class AutofacConfig
    {
        public static IContainer Container { get; private set; }

        public static void ConfigureContainer()
        {
            // получаем экземпляр контейнера
            var builder = new ContainerBuilder();

            // регистрируем контроллер в текущей сборке
            builder.RegisterControllers(typeof(MvcApplication).Assembly);

            // регистрируем споставление типов
            builder.RegisterType<StudentService>().As<IStudentService>().SingleInstance();
            builder.RegisterType<MarkService>().As<IMarkService>().SingleInstance();
            builder.RegisterType<SubjectService>().As<ISubjectService>().SingleInstance();
            builder.RegisterType<SchoolService>().As<ISchoolService>().SingleInstance();

            // создаем новый контейнер с теми зависимостями, которые определены выше
            Container = builder.Build();

            // установка сопоставителя зависимостей
            DependencyResolver.SetResolver(new AutofacDependencyResolver(Container));
        }
    }
}