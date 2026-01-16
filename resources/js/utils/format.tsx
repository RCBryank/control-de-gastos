export function NumbertoFormatCurrency(value: number) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        currencySign: 'standard'
    }).format(value);
}

export function DatetoYMDFormat(date: Date) {
    return date.getFullYear() + '-' + ('0' + (date.getMonth() + 1)).slice(-2) + '-' + ('0' + date.getDate()).slice(-2);
}

export function StringFullDatetoNormalFormat(date: string) {
    let _timeexploded = date.split(" ");
    const _sdate = _timeexploded[0];
    const _stime = _timeexploded[1];

    const _date = new Date(_sdate + "T" + _stime);
    return _date.getHours().toString().padStart(2, '0') + ":" + _date.getMinutes().toString().padStart(2, '0') + " " + _date.getDate().toString().padStart(2, '0') + "/" + (_date.getMonth() + 1).toString().padStart(2, '0') + "/" + _date.getFullYear();
}