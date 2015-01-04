using System;
using System.Collections.Generic;
using System.Runtime.Serialization;

namespace Sett.DataTransferObjects
{
    [DataContract]
    public class User
    {
        [DataMember]
        public Guid Id;

        [DataMember]
        public string FirstName;

        [DataMember]
        public string LastName;

        [DataMember]
        public string Username;
    }
}
