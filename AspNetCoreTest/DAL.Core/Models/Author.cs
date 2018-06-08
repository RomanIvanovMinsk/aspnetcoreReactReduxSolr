using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;

namespace DAL.Core.Models
{
	[Table("Author")]
	public class Author
	{
		public int ID { get; set; }
		public string LastName { get; set; }
		public string FirstMidName { get; set; }

		public ICollection<Post> Posts { get; set; }
	}
}
