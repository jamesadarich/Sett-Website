using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sett.API.Controllers
{
    public class ArticleRevisionController : ApiController
    {
        [HttpPost]
        [Route("article-revision")]
        public DataTransferObjects.ArticleRevision Post([FromBody] DataTransferObjects.ArticleRevision articleRevision)
        {
            try
            {
                var sessionId = Guid.Parse(Request.Headers.Authorization.Scheme);

                var manager = new Managers.ArticleRevisionManager();

                return manager.Create(
                                        articleRevision.Title,
                                        articleRevision.Content,
                                        articleRevision.Summary,
                                        articleRevision.ArticleId,
                                        articleRevision.FeaturedImage.Id,
                                        sessionId
                                      );

            }
            catch (UnauthorizedAccessException e)
            {
                var response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                response.Content = new StringContent(e.Message);
                throw new HttpResponseException(response);
            }
        }
    }
}