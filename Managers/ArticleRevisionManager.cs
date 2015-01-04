using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace Sett.Managers
{
    public class ArticleRevisionManager
    {
        public DataTransferObjects.ArticleRevision Create(string title, string content, string summary, Guid articleId, Guid featuredImageId, Guid sessionId)
        {
            var sessionManager = new SessionManager();
            var session = sessionManager.Get(sessionId);

            if (articleId == Guid.Empty)
            {
                var slug = title;
                slug = slug.Trim();
                slug = slug.ToLower();
                slug = slug.Replace(" ", "_");
                var article = new ArticleManager().Create(slug, sessionId);
                articleId = article.Id;
            }

            var repository = new DataAccess.Repository();

            var model = new Models.ArticleRevision();
            model.Title = title;
            model.Content = content;
            model.Summary = summary;
            model.ArticleId = articleId;
            model.AuthorId = session.UserId;
            model.FeaturedImageId = featuredImageId;
            model.Timestamp = DateTime.UtcNow;


            repository.ArticleRevisions.Add(model);
            repository.SaveChanges();

            var adapter = new Adapters.ArticleRevisionAdapter();
            return adapter.AdaptFromModel(model);

        }
    }
}
