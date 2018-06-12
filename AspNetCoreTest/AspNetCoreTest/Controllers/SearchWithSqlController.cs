using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http;
using System.Threading.Tasks;
using AspNetCoreTest.Services.Interfaces;
using DAL.Core.Models;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace AspNetCoreTest.Controllers
{
	[Route("api/[controller]")]
	public class SearchWithSqlController : Controller
	{
		private readonly IBlogPostService _blogPostService;


		public SearchWithSqlController(IBlogPostService blogPostService)
		{
			_blogPostService = blogPostService;
		}

		[HttpGet("{search}")]
		public async Task<IEnumerable<Post>> Search(string search)
		{
			return _blogPostService.GetPageWithPost(search);
		}
	}

}
