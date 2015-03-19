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
            var request = new HttpRequestMessage(HttpMethod.Get,
                                            string.Format("http://api.imaginarium.getsett.net/articles?where=slug:is:{0}", slug));

            var client = new HttpClient();
            var response = client.SendAsync(request).Result;

            var article = response.Content.ReadAsAsync<Article>().Result;

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

    public class Article
    {
        public Guid Id;

        public string Slug;

        public string Title;

        public string Content;

        public string Summary;

        public DateTime Timestamp;

        public User Author;

        public string FeaturedImageUrl;
    }

    public class User
    {
        public Guid Id;

        public string FirstName;

        public string LastName;

        public string Username;
    }
}
