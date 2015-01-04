using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sett.Models
{
    public class ArticleRevision
    {
        public ArticleRevision()
        {
            _id = Guid.NewGuid();
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

        private string _title;
        public string Title
        {
            get
            {
                return _title;
            }
            set
            {
                _title = value;
            }
        }

        private string _content;
        public string Content
        {
            get
            {
                return _content;
            }
            set
            {
                _content = value;
            }
        }

        private string _summary;
        public string Summary
        {
            get
            {
                return _summary;
            }
            set
            {
                _summary = value;
            }
        }

        private DateTime _timestamp;
        public DateTime Timestamp
        {
            get { return _timestamp; }
            set { _timestamp = value; }
        }

        private Guid _authorId;
        public Guid AuthorId
        {
            get { return _authorId; }
            set { _authorId = value; }
        }

        public virtual User Author
        {
            get;
            set;
        }

        private Guid _articleId;
        public Guid ArticleId
        {
            get { return _articleId; }
            set { _articleId = value; }
        }

        public virtual Article Article
        {
            get;
            set;
        }

        private Guid _featuredImageId;
        public Guid FeaturedImageId
        {
            get { return _featuredImageId; }
            set { _featuredImageId = value; }
        }

        public virtual Image FeaturedImage
        {
            get;
            set;
        }
    }
}
