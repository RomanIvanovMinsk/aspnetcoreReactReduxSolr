using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using AspNetCoreTest.Services.Interfaces;
using Microsoft.CodeAnalysis.CSharp.Syntax;

namespace AspNetCoreTest.Services
{
    public class FillDbService: IFillDbService
    {
	    public const string PATH_TO_THE_BOOK = "/ostin.txt";
	    private char[] charBuffer = new char[1];
	    const int MAX_BUFFER = 3000; 
	    byte[] buffer = new byte[MAX_BUFFER];

		public List<string> PredefinedListOfAuthors = new List<string>() { "Kipling", "Nabokov", "Tolstoy", "Gorkiy", "Butcher", "Pehov", "Draizer", "Pushkin"};
	    public string GetAuthor()
	    {
		    var rnd = new Random();
		    return PredefinedListOfAuthors[rnd.Next(PredefinedListOfAuthors.Count - 1)];
	    }

	    public IEnumerable<string> GetText()
	    {
		    object _lock = new object();
		    lock (_lock)
		    {
			    using (FileStream fs = File.Open(PATH_TO_THE_BOOK, FileMode.Open, FileAccess.Read))
			    {
				    int bytesRead;
				    using (BufferedStream bs = new BufferedStream(fs))
				    {
					    bool stop = false;
					    while ((bytesRead = bs.Read(buffer, 0, MAX_BUFFER)) != 0)
					    {
						    yield return System.Text.Encoding.Default.GetString(buffer);
					    }
				    }
				    fs.Close();
				}
			}		   
		}
	}
}
