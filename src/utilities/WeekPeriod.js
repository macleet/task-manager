class MyDate {
    constructor(year, month, date, day) {
        this.year = year;
        this.month = month;
        this.date = date;
        this.day = day;
    }

    getDateObject() {
        return new Date(this.year, this.month, this.date);
    }

    totalDaysInMonth(offset=0) {
        return new Date(this.year, this.month + offset + 1, 0).getDate();
    }
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

        this.start = new MyDate(year, month, date - day, 0);
        this.end = new MyDate(year, month, date + (6 - day), 6);

        this.checkCases();
    }

    getPeriodDatesArray() {
        const datesArray = [];
        const dateObj = this.start.getDateObject();

        for (let i = 0; i < 7; i++) {
            const tempDate = new Date(dateObj);
            tempDate.setDate(dateObj.getDate() + i);
            datesArray.push(tempDate);
        }

        return datesArray;
    }

    checkCases() {
        [this.start, this.end].forEach(dateObj => {
            while (dateObj.date < 1) {
                if (dateObj.month === 0) {
                    dateObj.year--;
                    dateObj.month = 11;
                } else {
                    dateObj.month--;
                }
                dateObj.date += dateObj.totalDaysInMonth();
            }

            while (dateObj.date > dateObj.totalDaysInMonth()) {
                dateObj.date -= dateObj.totalDaysInMonth();
                if (dateObj.month === 11) {
                    dateObj.year++;
                    dateObj.month = 0;
                } else {
                    dateObj.month++;
                }
            }
        });
    }

    nextPeriod(jumps=1) {
        for (let i = 0; i < jumps; i++) {
            this.start.date += 7;
            this.end.date += 7;
            this.checkCases();
        }
    }

    prevPeriod(jumps=1) {
        for (let i = 0; i < jumps; i++) {
            this.start.date -= 7;
            this.end.date -= 7;
            this.checkCases();
        }
    }
}

export default WeekPeriod;
