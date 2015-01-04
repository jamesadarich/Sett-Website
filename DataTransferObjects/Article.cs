using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Sett.DataTransferObjects
{
    [DataContract]
    public class Article
    {
        [DataMember]
        public Guid Id;

        [DataMember]
        public string Slug;

        [DataMember]
        public DateTime Timestamp;

        [DataMember]
        public IEnumerable<ArticleRevision> Revisions;
    }
}
