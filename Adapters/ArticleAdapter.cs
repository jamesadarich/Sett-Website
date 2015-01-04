using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sett.Adapters
{
    public class ArticleAdapter
    {
        public Models.Article AdaptFromDto(DataTransferObjects.Article dto)
        {
            return new Models.Article();
        }

        public DataTransferObjects.Article AdaptFromModel(Models.Article model)
        {
            var dto = new DataTransferObjects.Article();

            dto.Id = model.Id;

            dto.Slug = model.Slug;

            dto.Revisions = new List<DataTransferObjects.ArticleRevision>();

            if (model.ArticleRevisions != null)
            {
                var dtoRevision = new DataTransferObjects.ArticleRevision();

                var modelRevision = model.ArticleRevisions.OrderByDescending(revision => revision.Timestamp).FirstOrDefault();

                if (modelRevision != null)
                {
                    dtoRevision = new Adapters.ArticleRevisionAdapter().AdaptFromModel(modelRevision);
                }

                dto.Revisions = new List<DataTransferObjects.ArticleRevision>() { dtoRevision };
            }

            return dto;
        }
    }
}
