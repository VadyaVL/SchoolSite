using Autofac;
using Autofac.Integration.Mvc;
using SchoolSite.Domain.Core;
using SchoolSite.Domain.Interfaces;
using SchoolSite.Infrastructure.Data;
using System.Web.Mvc;

namespace SchoolSite.Util
{
    public class AutofacConfig
    {
        public static void ConfigureContainer()
        {
            // получаем экземпляр контейнера
            var builder = new ContainerBuilder();

            // регистрируем контроллер в текущей сборке
            builder.RegisterControllers(typeof(MvcApplication).Assembly);

            // регистрируем споставление типов
            builder.RegisterType<StudentRepository>().As<IRepository<Student>>().WithParameter("db", SchoolDBContext.GetInstance());
            builder.RegisterType<MarkRepository>().As<IRepository<Mark>>().WithParameter("db", SchoolDBContext.GetInstance());
            builder.RegisterType<SubjectRepository>().As<IRepository<Subject>>().WithParameter("db", SchoolDBContext.GetInstance());
            builder.RegisterType<SchoolRepository>().As<IRepository<School>>().WithParameter("db", SchoolDBContext.GetInstance());

            // создаем новый контейнер с теми зависимостями, которые определены выше
            var container = builder.Build();

            // установка сопоставителя зависимостей
            DependencyResolver.SetResolver(new AutofacDependencyResolver(container));
        }
    }
}