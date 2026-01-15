export function NumbertoFormatCurrency(value: number) {
    return new Intl.NumberFormat('es-MX', {
        style: 'currency',
        currency: 'MXN',
        currencySign: 'standard'
    }).format(value);
}