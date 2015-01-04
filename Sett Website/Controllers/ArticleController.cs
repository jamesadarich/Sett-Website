using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;

namespace Sett_Website.Controllers
{
    public class ArticleController : ApiController
    {
        [HttpGet]
        [Route("article/{slug}")]
        public HtmlString Get(string slug)
        {
            return new HtmlString("");
        }
    }
}
