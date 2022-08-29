
export const getDateNow = () => {
    const day = new Date ().getDate ()
    const month = getMonth ()
    const year = new Date ().getFullYear ()

    const hours = new Date ().getHours ()
    const minutes = new Date ().getMinutes ()

    function getMonth () {
        const currentMonth = new Date ().getMonth ()
        const months = [
            'Января', 'Февраля', 'Марта', 'Апреля', 
            'Мая', 'Июня', 'Июля', 'Августа', 
            'Сентября', 'Октября', 'Ноября', 'Декабря'
        ]
        for (let i = 0; i < months.length; i++) {
            if (currentMonth === i) {
                return months [i]
            }
        }
    }

    return {
        day, month, year, hours, minutes
    }
}