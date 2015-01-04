using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Data.Entity;
using System.Data.Entity.ModelConfiguration.Conventions; 

namespace Sett.DataAccess
{
    public class Repository: DbContext
    {
        public Repository()
            : base("Repository")
        {
        }

        public DbSet<Models.Article> Articles { get; set; }
        public DbSet<Models.ArticleRevision> ArticleRevisions { get; set; }
        public DbSet<Models.User> Users { get; set; }
        public DbSet<Models.Image> Images { get; set; }

        protected override void OnModelCreating(DbModelBuilder modelBuilder)
        { 
            // Configure Code First to ignore PluralizingTableName convention 
            // If you keep this convention then the generated tables will have pluralized names. 
            modelBuilder.Conventions.Remove<PluralizingTableNameConvention>();

        }
    }
}
