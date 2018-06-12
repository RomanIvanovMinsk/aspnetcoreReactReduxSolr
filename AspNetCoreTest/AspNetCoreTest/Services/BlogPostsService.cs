using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using AspNetCoreTest.Services.Interfaces;
using DAL.Core;
using DAL.Core.Models;
using Microsoft.EntityFrameworkCore;

namespace AspNetCoreTest.Services
{
    public class BlogPostsService: IBlogPostService
	{
	    private readonly MainContext _context;

	    public BlogPostsService(MainContext context)
	    {
		    _context = context;
	    }

	    public List<Post> GetPageWithPost(int pageNumber)
	    {
		    pageNumber++;
			var posts = _context.Posts.Include(x => x.Author).
				Select(post => new Post()
				{
					ID = post.ID,
					Title = post.Title,
					Author = new Author() {  ID = post.Author.ID, LastName = post.Author.LastName},
					Text = post.Text,
				}).Skip(30 * (pageNumber - 1)).Take(30).ToList();
		    return posts;
	    }

		public List<Post> GetPageWithPost(string search)
		{

			var posts = _context.Posts.Include(x => x.Author).Where( x => x.Text.Contains(search) || x.Title.Contains(search)).Select(post => new Post()
			{
				ID = post.ID,
				Title = post.Title,
				Author = new Author() {ID = post.Author.ID, LastName = post.Author.LastName},
				Text = post.Text,
			}).ToList();

			return posts;
		}
	}
}
