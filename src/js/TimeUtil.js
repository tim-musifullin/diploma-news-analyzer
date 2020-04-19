export class TimeUtil {
  constructor() {
    this.date = new Date();
  }

  formate(date) {
    let regex = /\d{4}\-\d{2}\-\d{1,2}/g;
    let arrDate = date.match(regex).join().split("-");
    let cardDate = [];
    switch (arrDate[1]) {
      case "01":
        cardDate.push("января");
        break;
      case "02":
        cardDate.push("февраля");
        break;
      case "03":
        cardDate.push("марта");
        break;
      case "04":
        cardDate.push("ареля");
        break;
      case "05":
        cardDate.push("мая");
        break;
      case "06":
        cardDate.push("июня");
        break;
      case "07":
        cardDate.push("июля");
        break;
      case "08":
        cardDate.push("августа");
        break;
      case "09":
        cardDate.push("сентября");
        break;
      case "10":
        cardDate.push("октября");
        break;
      case "11":
        cardDate.push("ноября");
        break;
      case "12":
        cardDate.push("декабря");
        break;
    }
    cardDate.push(arrDate[0], arrDate[2]);
    return `${cardDate[2]} ${cardDate[0]} ${cardDate[1]}`;
  }

  apiFormateTo() {
    const today = 
    this.date.getFullYear() + "-" + (parseInt(this.date.getMonth() + 1) < 10 ? "0" + 
    parseInt(this.date.getMonth() + 1) : parseInt(this.date.getMonth() + 1)) + "-" + this.date.getDate();
    return today;
  }

  apiFormateFrom() {
    const week = new Date();
    week.setDate(week.getDate() - 7);
    const weekAgo = week.getFullYear() + "-" + (parseInt(week.getMonth() + 1) < 10 ? "0" + parseInt(week.getMonth() + 1) : parseInt(week.getMonth() + 1)) + "-" + week.getDate();
    return weekAgo;
  }
}
