using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sett.API.Controllers
{
    public class ArticleController : ApiController
    {
        [HttpGet]
        [Route("articles")]
        public IEnumerable<DataTransferObjects.Article> Get()
        {
            var manager = new Managers.ArticleManager();

            return manager.GetAll();
        }

        [HttpGet]
        [Route("article")]
        public DataTransferObjects.Article Get([FromUri] Guid id)
        {
            var manager = new Managers.ArticleManager();

            return manager.Get(id);
        }

        [HttpDelete]
        [Route("article")]
        public void Delete([FromUri] Guid id)
        {
            var sessionId = Guid.Parse(Request.Headers.Authorization.Scheme);

            var manager = new Managers.ArticleManager();

            manager.Delete(id, sessionId);
        }

    }
}