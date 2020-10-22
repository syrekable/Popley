Array.prototype.pickRandom = function(){
    return this[Math.floor(Math.random()*this.length)];
  }
  
  
 export default class MockPlants{
    static randomTime(){  
      let interval = this.intervals.pickRandom();
      return interval * Math.floor(100*Math.random())
    }
    static getPlant(){
      return {
        name: this.names.pickRandom(),
        time: this.randomTime()
      }
    }
  }

MockPlants.intervals = [0, 15, 30, 45, 60, 120, 300, 600, 3600];
MockPlants.names = ["mandragora", "kuktas", "cukinia", "magnolia", "konopia", "orichidea", "burak"];