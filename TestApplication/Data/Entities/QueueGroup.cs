using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using Newtonsoft.Json;

namespace TestApplication.Data.Entities
{
    public class QueueGroup
    {
        [Key]
        public int ID { get; set; }
        public string Name { get; set; }
        [JsonProperty("SLA_Percent")]
        public int SLAPercent{ get; set; }
        [JsonProperty("SLA_Time")]
        public int SLATime { get; set; }
        public List<MonitorData> MonitorData { get; set; }
    }
}
