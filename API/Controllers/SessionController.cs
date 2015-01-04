using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace Sett.API.Controllers
{
    public class SessionController : ApiController
    {
        [HttpGet]
        [Route("login")]
        public DataTransferObjects.Session Get([FromUri] string username, [FromUri] string password)
        {
            try
            {
                var sessionManager = new Managers.SessionManager();
                return sessionManager.Create(username, password);
            }
            catch(UnauthorizedAccessException e)
            {
                var response = new HttpResponseMessage(HttpStatusCode.Unauthorized);
                response.Content = new StringContent(e.Message);
                throw new HttpResponseException(response);
            }
        }
    }
}