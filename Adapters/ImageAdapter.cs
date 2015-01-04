using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sett.Adapters
{
    public class ImageAdapter
    {
        public Models.Image AdaptFromDto(DataTransferObjects.Image dto)
        {
            return new Models.Image();
        }

        public DataTransferObjects.Image AdaptFromModel(Models.Image model)
        {
            if (model == null)
            { 
                return null;            
            }

            var dto = new DataTransferObjects.Image();

            dto.Id = model.Id;
            dto.Url = model.Url;

            return dto;
        }
    }
}
