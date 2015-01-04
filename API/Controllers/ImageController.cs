using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Sett.API.Controllers
{
    public class ImageController : ApiController
    {
        [HttpPost, Route("image/upload")]
        public async Task<DataTransferObjects.Image> Upload()
        {
            if (!Request.Content.IsMimeMultipartContent())
                throw new Exception(); // divided by zero

            var provider = new MultipartMemoryStreamProvider();
            try
            {
                await Request.Content.ReadAsMultipartAsync(provider);
            }
            catch (Exception e)
            {
                var t = e.Message;
            }

            var image = new DataTransferObjects.Image();

            foreach (var file in provider.Contents)
            {
                var filename = file.Headers.ContentDisposition.FileName.Trim('\"');
                var buffer = await file.ReadAsByteArrayAsync();

                var url = new FileUploader().UploadImage(filename, buffer);

                var sessionId = Guid.Parse(Request.Headers.Authorization.Scheme);
                return new Managers.ImageManager().Create(url, sessionId);
            }

            return image;
        }
    }
}