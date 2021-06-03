import { isToday, isThisMonth, isThisYear, format } from 'date-fns';

export function formatDate(d) {
    let formatString = '';
    if (isToday(d)) {
        formatString = 'HH:mm';
    } else if (isThisMonth(d)) {
        formatString = 'd MMM HH:mm';
    } else if (isThisYear(d)) {
        formatString = 'd MMM';
    } else {
        formatString = 'd MMM yyyy';
    }
    return format(d, formatString);
}
