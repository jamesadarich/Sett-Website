using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Sett.API
{
    public class FileUploader
    {
        public string UploadImage(string fileName, byte[] fileBody)
        {
            var relativePath = string.Format("/images/{0}", fileName);
            var fullPath = AppDomain.CurrentDomain.BaseDirectory + relativePath;
            try
            {
                var stream = new System.IO.FileStream(fullPath, System.IO.FileMode.CreateNew, System.IO.FileAccess.Write);
                stream.Write(fileBody, 0, fileBody.Length);
                stream.Close();
            }
            catch(UnauthorizedAccessException e)
            {
                //need to give permissions
                throw new Exception(string.Format("You must give write permission to {0}", fullPath));
            }

            return relativePath;
        }
    }
}