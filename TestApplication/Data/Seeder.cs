using Newtonsoft.Json;
using System.Collections.Generic;
using System.IO;
using TestApplication.Data.Entities;

namespace TestApplication.Data
{
    public static class Seeder
    {

        public static List<T> GetModel<T>(string filePath)
        {
            using (StreamReader reader = new(filePath))
            {
                string json = reader.ReadToEnd();
                List<T> items = JsonConvert.DeserializeObject<List<T>>(json);
                return items;
            }
        }
    }
}
