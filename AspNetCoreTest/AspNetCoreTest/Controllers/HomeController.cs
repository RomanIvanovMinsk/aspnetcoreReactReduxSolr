using System;
using System.Collections.Generic;
using System.Data.SqlClient;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreTest.Services.Interfaces;
using DAL.Core;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace AspNetCoreTest.Controllers
{
    public class HomeController : Controller
    {
	    private readonly IServiceProvider _provider;
	    private readonly IFillDbService _fillDbService;

	    public HomeController(IServiceProvider serviceProvider, IFillDbService fillDbService)
	    {
		    _provider = serviceProvider;
		    _fillDbService = fillDbService;
	    }
        public IActionResult Index()
        {
            return View();
        }

	    public IActionResult Error()
        {
            ViewData["RequestId"] = Activity.Current?.Id ?? HttpContext.TraceIdentifier;
            return View();
        }

	    public IActionResult Seed()
	    {
		    using (var serviceScope = _provider.CreateScope())
		    {
			    using (var context = serviceScope.ServiceProvider.GetService<MainContext>())
			    {
				    for (var i = 0; i <= 999; i++)
				    {
					    string text = "";
					    text = _fillDbService.GetText().ToList()[i];

					    var author = _fillDbService.GetAuthor();
					    var textParam = new SqlParameter("Text", text);
					    var authorParam = new SqlParameter("Author", author);

					    context.Database.ExecuteSqlCommand("EXECUTE dbo.AddTextToTheCurrentAuthor  @Author, @Text", authorParam, textParam);
				    }
				   
				}
		    }

			return new EmptyResult();
	    }

    }
}
