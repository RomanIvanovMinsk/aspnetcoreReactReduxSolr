using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Core.Models
{
	[Table("Post")]
	public class Post
	{
		public int ID { get; set; }
		public string  Title { get; set; }

		public string  Text { get; set; }

		public Author Author { get; set; }

		public DateTime Created { get; set; }

		public DateTime Updated { get; set; }
	}
}
