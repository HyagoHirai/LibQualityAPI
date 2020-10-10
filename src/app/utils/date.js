function diffDatesByDay(firstDate, secondDate) {
    const date1 = new Date(firstDate);
    const date2 = new Date(secondDate);
    const diffTime = Math.abs(date1 - date2);
    const diffDays = diffTime / (8.64e7);
    return diffDays;
}

module.exports = {
    diffDatesByDay,
};
