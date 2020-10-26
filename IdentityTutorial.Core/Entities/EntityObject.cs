using IdentityTutorial.Core.Contracts;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Text;

namespace IdentityTutorial.Core.Entities
{
    public class EntityObject : IEntityObject
    {
        [Key]
        public int Id { get; set; }

        [Timestamp]
        public byte[] Timestamp
        {
            get;
            set;
        }
    }
}