export const getMonthForHourly = (num: string) => {
    const months = [
        'Января', 'Февраля', 'Марта', 'Апреля', 
        'Мая', 'Июня', 'Июля', 'Августа', 
        'Сентября', 'Октября', 'Ноября', 'Декабря'
    ]

    for (let i = 0; i < months.length; i++) {
        if (Number (num.split ('')[0]) === 0 && Number (num.split ('')[1]) - 1 === i) {
            return months [i]
        } else if (Number (num.split ('')[0]) !== 0 && Number (num.split ('')[0]) - 1 === i) {
            return months [i]
        }
    }
}