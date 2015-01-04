using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace Sett.Managers
{
    public class ImageManager
    {
        public DataTransferObjects.Image Create(string url, Guid sessionId)
        {
            var s = new SessionManager().Get(sessionId);

            var repository = new DataAccess.Repository();

            var model = new Models.Image();
            model.Url = url;

            repository.Images.Add(model);
            repository.SaveChanges();

            var adapter = new Adapters.ImageAdapter();
            return adapter.AdaptFromModel(model);

        }

    }
}
