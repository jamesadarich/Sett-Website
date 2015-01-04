using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sett.Adapters
{
    public class ArticleRevisionAdapter
    {
        public Models.ArticleRevision AdaptFromDto(DataTransferObjects.ArticleRevision dto)
        {
            return new Models.ArticleRevision();
        }

        public DataTransferObjects.ArticleRevision AdaptFromModel(Models.ArticleRevision model)
        {
            var dto = new DataTransferObjects.ArticleRevision();

            dto.Title = model.Title;
            dto.Content = model.Content;
            dto.Summary = model.Summary;
            dto.Timestamp = model.Timestamp;
            dto.ArticleId = model.ArticleId;

            dto.Author = new UserAdapter().AdaptFromModel(model.Author);
            dto.FeaturedImage = new ImageAdapter().AdaptFromModel(model.FeaturedImage);

            return dto;
        }
    }
}
