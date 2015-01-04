using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Sett.Managers
{
    public class SessionManager
    {
        private static ICollection<Session> _sessions = new List<Session>();

        public Session Get(Guid id)
        {
            var session = _sessions.SingleOrDefault(s => s.Id == id);

            //JDR: session does not exist
            if (session == null)
            {
                throw new UnauthorizedAccessException("Session does not exist.");
            }

            //JDR: session has expired
            if (session.ExpiresOn < DateTime.UtcNow)
            {
                _sessions.Remove(session);
                throw new UnauthorizedAccessException("Session has expired.");
            }

            session.ExpiresOn = session.ExpiresOn.AddMinutes(10);

            return session;

        }

        public DataTransferObjects.Session Create(string username, string password)
        {
            var user = new DataAccess.Repository().Users.SingleOrDefault(u => u.Username == username);

            if (user == null)
            {
                throw new UnauthorizedAccessException(string.Format("User \"{0}\" does not exist.", username));
            }

            if (user.Password != password)
            {
                throw new UnauthorizedAccessException("Incorrect password.");
            }

            var session = new Session(user.Id);

            _sessions.Add(session);

            var sessionDto = new DataTransferObjects.Session();
            sessionDto.Id = session.Id;
            sessionDto.Expires = session.ExpiresOn;

            return sessionDto;
        }


        public class Session
        {
            public Session(Guid userId)
            {
                Id = Guid.NewGuid();
                _expiresOn = DateTime.UtcNow.AddMinutes(10);
                UserId = userId;
            }

            public readonly Guid Id;

            private DateTime _expiresOn;
            public DateTime ExpiresOn
            {
                get
                {
                    return _expiresOn;
                }
                set
                {
                    _expiresOn = value;
                }
            }

            public readonly Guid UserId;
        }
    }
}
