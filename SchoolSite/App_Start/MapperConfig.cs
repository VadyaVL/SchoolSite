using AutoMapper;
using SchoolSite.Domain.Core;
using SchoolSite.Domain.Core.DTO;
using SchoolSite.Domain.DTO;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace SchoolSite.Util
{
    public class MapperConfig
    {

        public static void ConfigureMapper()
        {
            Mapper.Initialize(cfg => {
                cfg.CreateMap<Mark, MarkViewModel>();
                cfg.CreateMap<MarkCreateUpdateModel, Mark>();
                cfg.CreateMap<School, SchoolViewModel>();
                cfg.CreateMap<SchoolViewModel, School>();
                cfg.CreateMap<Student, StudentViewModel>();
                cfg.CreateMap<StudentCreateUpdateModel, Student>();
                cfg.CreateMap<Subject, SubjectViewModel>();
                cfg.CreateMap<SubjectViewModel, Subject>();
            });
        }
    }
}