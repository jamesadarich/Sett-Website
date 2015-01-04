using System;
using System.Text;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Http.Headers;
using System.Web.Http;
using System.Web;
using System.ServiceModel.Web;
using RazorEngine;

namespace Sett.GUI.Controllers
{
    public class GuiArticleController : ApiController
    {
        [HttpGet]
        [Route("article/{slug}")]
        public HttpResponseMessage Get(string slug)
        {

            Sett.DataTransferObjects.Article article;
            try
            {
                article = new API.Controllers.ArticleController().Get().Where(a => a.Slug == slug).SingleOrDefault();
            }
            catch(InvalidOperationException e)
            {
                return new HttpResponseMessage(HttpStatusCode.Conflict);
            }

            if (article == null)
            {
                return new HttpResponseMessage(HttpStatusCode.NotFound);
            }


            string template = System.IO.File.ReadAllText(HttpContext.Current.Server.MapPath("~/templates/article.html"));

            //System.IO.File.ReadAllText(@"c:\whatever\somefile.htm")
            var response = new HttpResponseMessage(HttpStatusCode.OK);
            response.Content = new StringContent(Razor.Parse(template, article));
            response.Content.Headers.ContentType = new MediaTypeHeaderValue("text/html");
            return response; 
        }
    }
}
