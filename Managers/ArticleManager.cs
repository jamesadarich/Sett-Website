using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;

namespace Sett.Managers
{
    public class ArticleManager
    {
        public IEnumerable<DataTransferObjects.Article> GetAll()
        {
            var adapter = new Adapters.ArticleAdapter();

            var repository = new DataAccess.Repository();

            var models = repository.Articles
                .Include(a => a.ArticleRevisions.Select(ar => ar.Author))
                .Include(a => a.ArticleRevisions.Select(ar => ar.FeaturedImage));

            var dtos = models
                .AsEnumerable()
                .Select(model => adapter.AdaptFromModel(model))
                .OrderByDescending(dto => dto.Revisions.First().Timestamp);

            return dtos;
        }

        public DataTransferObjects.Article Create(string slug, Guid sessionId)
        {
            var s = new SessionManager().Get(sessionId);

            var repository = new DataAccess.Repository();

            var model = new Models.Article();
            model.Slug = slug;

            repository.Articles.Add(model);
            repository.SaveChanges();

            var adapter = new Adapters.ArticleAdapter();
            return adapter.AdaptFromModel(model);

        }

        public DataTransferObjects.Article Get(Guid id)
        {
            var adapter = new Adapters.ArticleAdapter();

            var repository = new DataAccess.Repository();

            return adapter.AdaptFromModel(repository.Articles
                .Include(a => a.ArticleRevisions)
                .Single(x => x.Id == id)
                );
        }

        public void Delete(Guid id, Guid sessionId)
        {
            var sessionManager = new SessionManager();
            sessionManager.Get(sessionId);

            var repository = new DataAccess.Repository();

            repository.ArticleRevisions.RemoveRange(repository.ArticleRevisions.Where(revision => revision.ArticleId == id));

            repository.Articles.Remove(repository.Articles.Single(article => article.Id == id));

            repository.SaveChanges();
        }
    }
}
