const getDays = meets => {
    const days = meets.match(/M|Tu|W|Th|F|S|Su/g);
    return days || [];
};


const dayConflict = (course1, course2) => {

    const days1 = getDays(course1.meets.substring(0, course1.meets.indexOf(' ')));
    const days2 = getDays(course2.meets.substring(0, course2.meets.indexOf(' ')));

    for (const day of days1) {
        if (days2.includes(day)) 
            return true;
    }
    return false;
};

const getTimes = (time) => {
    const split = time.split('-');
    const start = parseTimeMinutes(split[0]);
    const end = parseTimeMinutes(split[1]);
    return {start, end};
};

const parseTimeMinutes = (time) => {
    const split = time.split(':');
    const hours = parseInt(split[0]);
    const minutes = parseInt(split[1]);
    return hours * 60 + minutes;
};

const timeConflict = (course1, course2) => {
    const {start: start1, end: end1} = getTimes(course1.meets.substring(course1.meets.indexOf(' ') + 1));
    const {start: start2, end: end2} = getTimes(course2.meets.substring(course2.meets.indexOf(' ') + 1));

    return start1 < end2 && start2 < end1;
};

const CheckConflict = (course1, course2) => {
    // false if there is no meeting information 
    if (!course1.meets || !course2.meets) 
        return false;

    //false if there is no term conflict
    if (course1.term !== course2.term) 
        return false;

    // false if there is no day conflict 
    if (!dayConflict(course1, course2))
        return false;

    // false if there is no time conflict
    if (!timeConflict(course1, course2))
        return false;

    return true;
};

export default CheckConflict;