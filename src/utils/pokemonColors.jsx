const pokemonColors = (color=null) => {
    switch(color){
        case 'black':
            return "#252525"
        case 'blue':
            return "#638fad"
        case 'brown':
            return "#977a6a"
        case 'gray':
            return "#696969"
        case 'green':
            return "#708969"
        case 'pink':
            return "#bb8895"
        case 'purple':
            return "#9b72a5"
        case 'red':
            return "#a54141"
        case 'white':
            return "#d2d0ce"
        case 'yellow':
            return "#cbbf67"
        default:
            return "#f1f1f1"
    }
}

export default pokemonColors