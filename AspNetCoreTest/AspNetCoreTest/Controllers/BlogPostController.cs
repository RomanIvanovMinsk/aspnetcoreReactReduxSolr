using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using AspNetCoreTest.Services;
using AspNetCoreTest.Services.Interfaces;
using DAL.Core.Models;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace AspNetCoreTest.Controllers
{
    [Route("api/[controller]")]
    public class BlogPostsController : Controller
    {
	    private readonly IBlogPostService _blogPostService;


	    public BlogPostsController(IBlogPostService blogPostService)
	    {
		    _blogPostService = blogPostService;
	    }
        // GET: api/values
        [HttpGet]
        public IEnumerable<string> Get()
        {
			//here we get all blog posts
            return new string[] { "value1", "value2" };
        }

        // GET api/values/5
        [HttpGet("{byPage}")]
        public List<Post> Get(int pageIndex)
        {
			//here we try implement some sort of paging
	        return _blogPostService.GetPageWithPost(pageIndex);
        }


		// POST api/values
		[HttpPost]
        public void Post([FromBody]string value)
        {
        }

        // PUT api/values/5
        [HttpPut("{id}")]
        public void Put(int id, [FromBody]string value)
        {
        }

        // DELETE api/values/5
        [HttpDelete("{id}")]
        public void Delete(int id)
        {
        }
    }
}
