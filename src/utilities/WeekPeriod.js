class MyDate {
    constructor(year, month, date, day) {
        this.year = year;
        this.month = month;
        this.date = date;
        this.day = day;
    }

    totalDaysInMonth(offset=0) { return new Date(this.year, this.month + offset + 1, 0).getDate(); }
}

class WeekPeriod {
    constructor(start=null, end=null) {
        if (start && end) {
            this.start = start;
            this.end = end;
            return;
        }
 
        const dateObj = new Date();
 
        const year = dateObj.getFullYear();
        const month = dateObj.getMonth();
        const date = dateObj.getDate();
        const day = dateObj.getDay();
 
        this.start = new MyDate(year, month, date - day, 0);    // Set date to Sunday's date
        this.end = new MyDate(year, month, date + (6 - day), 6);    // Set date to Saturday's date
 
        this.checkCases();
    }
 
    checkCases() {
        // Cases: 
        //      Change month when current week crosses over to next/prev month
        //      Change year when this happens during Jan and Dec, accordingly
        switch (true) {
            case this.start.date < 1:
                if (this.start.month === 0) {
                    this.start.year--;
                    this.start.month = 11;  // Set to December
                }
                else this.start.month--;
                this.start.date += this.start.totalDaysInMonth();
                break;
            case this.start.date >= 28 && this.start.date > this.start.totalDaysInMonth():
                if (this.start.month === 11) {  // End date lands of next month
                    this.start.year++;
                    this.start.month = 0;  // Set to January
                } 
                else this.start.month++;
                this.start.date -= this.start.totalDaysInMonth();
                break;
        }
 
        switch (true) {
            case this.end.date < 1:
                if (this.end.month === 0) {
                    this.end.year--;
                    this.end.month = 11;  // Set to December
                }
                else this.end.month--;
                this.end.date += this.end.totalDaysInMonth();
                break;
            case this.end.date >= 28 && this.end.date > this.end.totalDaysInMonth():
                if (this.end.month === 11) {  // End date lands of next month
                    this.end.year++;
                    this.end.month = 0;  // Set to January
                } 
                else this.end.month++;
                this.end.date -= this.end.totalDaysInMonth();
                break;
        }
    }
 
    nextPeriod(jumps=1) {
        for (let i = 0; i < jumps; i++) {
            this.start.date += 7;
            this.end.date += 7;
            this.checkCases();
        }
    }
 
    prevPeriod(jumps=1) {
        console.log(this.start.date, this.end.date)
        for (let i = 0; i < jumps; i++) {
            this.start.date -= 7;
            this.end.date -= 7;
            this.checkCases();
        }
    }
}

export default WeekPeriod;