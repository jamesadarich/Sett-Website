using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sett.Models
{
    public class Article
    {
        public Article()
        {
            _id = Guid.NewGuid();
            _articleRevisions = new List<ArticleRevision>();
        }

        private Guid _id;
        public Guid Id
        {
            get
            {
                return _id;
            }
            set
            {
                _id = value;
            }
        }

        private string _slug;
        public string Slug
        {
            get { return _slug; }
            set { _slug = value; }
        }

        private ICollection<ArticleRevision> _articleRevisions;
        public virtual ICollection<ArticleRevision> ArticleRevisions
        {
            get
            {
                return _articleRevisions;
            }
            set
            {
                _articleRevisions = value.ToList();
            }
        }

    }
}
