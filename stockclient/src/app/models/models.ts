export interface Stock{
    id : number
    market : string
    ticker : string
    stockName : string
    description : string
    lastprice : number
    targetprice : number
    epsttm : number
    pettm : number
    dps : number
    divyield : number
    bookvalue : number
    pb : number
    watchlistid : number
    portfolioid : number
    stockx : boolean
    stocky : boolean
    stockz : boolean
}

export interface Notification{
    id: number
    title :  string
    content : string 
    uploaded : string
}