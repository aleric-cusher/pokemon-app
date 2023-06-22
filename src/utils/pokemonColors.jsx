const pokemonColors = (color=null) => {
    switch(color){
        case 'black':
            return "#555555"
        case 'blue':
            return "#00B9E8"
        case 'brown':
            return "#9F8170"
        case 'gray':
            return "#A5B0BF"
        case 'green':
            return "#7BA05B"
        case 'pink':
            return "#FF91AF"
        case 'purple':
            return "#B284BE"
        case 'red':
            return "#ED2939"
        case 'white':
            return "#BEBFC5"
        case 'yellow':
            return "#F8DE7E"
        default:
            return "#f1f1f1"
    }
}

export default pokemonColors