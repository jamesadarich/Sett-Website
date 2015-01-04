using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sett.Adapters
{
    public class UserAdapter
    {
        public Models.User AdaptFromDto(DataTransferObjects.User dto)
        {
            return new Models.User();
        }

        public DataTransferObjects.User AdaptFromModel(Models.User model)
        {
            if (model == null)
            {
                return null;
            }
            var dto = new DataTransferObjects.User();

            dto.Id = model.Id;
            dto.FirstName = model.FirstName;
            dto.LastName = model.LastName;
            dto.Username = model.Username;

            return dto;
        }
    }
}
