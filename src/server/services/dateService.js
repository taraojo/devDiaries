function convertDate(date) {
    if (!Date.parse(date)) {
        return null;
    }

    date = new Date(date);
    let dateVal = date.getDate(),
        month = date.toLocaleString('en-gb', { month: 'long' }),
        year = date.getFullYear().toString().substring(2,4);

    return `${dateVal}${getDateSuffix(dateVal)} ${month} '${year}`;
}

function getDateSuffix(dateVal) {
    let day = parseInt(dateVal);

    if(day && day > 0) {
        let lastDigit = day.toString().slice(-1);
        switch (lastDigit) {
            case '1':
                return 'st';
            case '2':
                return 'nd';
            case '3':
                return 'rd';
            default:
                return 'th';
        }
    } else {
        return null;
    }
}

module.exports = {
    convertDate,
    getDateSuffix
};