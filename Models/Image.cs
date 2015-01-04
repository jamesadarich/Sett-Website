using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sett.Models
{
    public class Image
    {
        public Image()
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

        private string _url;
        public string Url
        {
            get { return _url; }
            set { _url = value; }
        }
    }
}
