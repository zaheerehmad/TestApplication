using System;

namespace TestApplication.Models
{
    public class MonitorDataResponse
    {
        int _talkTime, _afterCallWorkTime, _handledWithinSL, _slPercent;
        public string QueueGroupName { get; set; }
        public int Offered { get; set; }
        public int Handled { get; set; }
        public string AverageTalkTime { get { return new TimeSpan(0, 0, _talkTime / Offered).ToString(@"hh\:mm\:ss"); } }
        public string AverageHandlingTime { get { return new TimeSpan(0, 0, (_talkTime + _afterCallWorkTime) / Handled).ToString(@"hh\:mm\:ss"); } }
        public decimal ServiceLevel { get { return ((decimal)_handledWithinSL / Offered) * 100; } }
        public string Color { get { return ServiceLevel > _slPercent ? "green" : "red"; } }

        public MonitorDataResponse(string queneName, int offered, int handled, int talkTime, int afterCallWorkTime, int handledWithinSL, int slPercent)
        {
            QueueGroupName = queneName;
            Offered = offered;
            Handled = handled;
            _talkTime = talkTime;
            _handledWithinSL = handledWithinSL;
            _afterCallWorkTime = afterCallWorkTime;
            _slPercent = slPercent;
        }

    }
}