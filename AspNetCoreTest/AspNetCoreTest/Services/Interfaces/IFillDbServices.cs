using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace AspNetCoreTest.Services.Interfaces
{
    public interface IFillDbService
    {
	    string GetAuthor();

	    IEnumerable<string> GetText();
    }
}
