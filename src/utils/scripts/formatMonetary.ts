const Formatador = new Intl.NumberFormat('pt-br', {
    style: 'currency',
    currency: 'BRL',
})
export const formatMonetary = (value : number) => {
    return Formatador.format(value)
}
