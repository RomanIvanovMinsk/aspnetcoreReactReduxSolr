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
	public class SearchController : Controller
	{
		private readonly IBlogPostService _blogPostService;


		public SearchController()
		{

		}

		[HttpGet("{search}")]
		public async Task<IEnumerable<Post>> Search(string search)
		{
			var searchString = string.Format("http://localhost:8986/solr/aspnetcore/select?q={0}&wt=json&indent=true",
				search);
			using (HttpClient client = new HttpClient())
				using (HttpResponseMessage res = await client.GetAsync(searchString))
					using (HttpContent content = res.Content)
					{
						string data = await content.ReadAsStringAsync();

						SolrResponse result = (SolrResponse) JsonConvert.DeserializeObject(data, typeof(SolrResponse));

						return result.response.docs;
					}
		}
	}

	public class SolrResponse
	{
		public object responseHeader { get; set; }
		public Response response { get; set; }
	}

	public class Response
	{
		public List<Post> docs { get; set; }
	}
}
