using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

namespace TestApplication.Data.Entities
{
    public class MonitorData
    {
        [Key]
        public int Id { get; set; }
        public int TalkTime { get; set; }
        public int AfterCallWorkTime { get; set; }
        public int Handled { get; set; }
        public int Offered { get; set; }
        public int HandledWithinSL { get; set; }
        [ForeignKey("QueueGroup")]
        public int QueueGroupID { get; set; }
        public QueueGroup QueueGroup { get; set; }

    }
}
