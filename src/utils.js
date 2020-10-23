Array.prototype.pickRandom = function () {
  return this[Math.floor(Math.random() * this.length)];
}

class MockPlants {
  static randomTime() {
    let interval = this.intervals.pickRandom();
    return interval * Math.floor(100 * Math.random())
  }
  static getPlantData() {
    return {
      name: this.names.pickRandom(),
      time: this.randomTime()
    }
  }
}

function timeToSeconds(wateringInterval){
  //return given interval, expressed as {quantity: int, interval: str} till next watering in seconds
  const exchangeRate = {
    "day": 24*60*60,
    "week": 7*24*60*60,
    "month": 4*7*24*60*60,
  }; 
  console.log(`wateringInterval:\t${JSON.stringify(wateringInterval)}\nwateringInterval.interval\t${wateringInterval.interval}\n`);
  console.log(`exchangeRate:\t${JSON.stringify(exchangeRate)}
  wateringInterval.interval==="day"\t${wateringInterval.interval==="day"}
  typeof(wateringInterval.interval):\y${typeof(wateringInterval.interval)}
  exchangeRate["day"]\t${exchangeRate["day"]}
  exchangeRate[wateringInterval.interval]:\t${exchangeRate[wateringInterval.interval]}`)
  return wateringInterval.quantity * exchangeRate[wateringInterval.interval];
}

MockPlants.intervals = [0, 15, 30, 45, 60, 120, 300, 600, 3600];
MockPlants.names = ["mandragora", "kuktas", "cukinia", "magnolia", "konopia", "orichidea", "burak", "trzcina cukrowa"];

export default { MockPlants, timeToSeconds }