using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using DAL.Core.Models;

namespace AspNetCoreTest.Services.Interfaces
{
    public interface IBlogPostService
    {
	    List<Post> GetPageWithPost(int pageNumber);

	    List<Post> GetPageWithPost(string search);
	}
}
