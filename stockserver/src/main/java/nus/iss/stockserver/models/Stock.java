package nus.iss.stockserver.models;

public class Stock {
    private Integer id;
    private String market;
    private String ticker;
    private String stockName;
    private String description;
    private Double lastprice;
    private Double targetprice;
    private Double epsttm;
    private Double pettm;
    private Double dps;
    private Double divyield;
    private Double bookvalue;
    private Double pb;
    private Integer watchlistid;
    private Integer portfolioid;
    private Boolean stockx;
    private Boolean stocky;
    private Boolean stockz;
    

    public Stock() {
    }   

    public Stock(Integer id, String market, String ticker, String stockName, String description, Double lastprice,
            Double targetprice, Double epsttm, Double pettm, Double dps, Double divyield, Double bookvalue, Double pb,
            Integer watchlistid, Integer portfolioid, Boolean stockx, Boolean stocky, Boolean stockz) {
        this.id = id;
        this.market = market;
        this.ticker = ticker;
        this.stockName = stockName;
        this.description = description;
        this.lastprice = lastprice;
        this.targetprice = targetprice;
        this.epsttm = epsttm;
        this.pettm = pettm;
        this.dps = dps;
        this.divyield = divyield;
        this.bookvalue = bookvalue;
        this.pb = pb;
        this.watchlistid = watchlistid;
        this.portfolioid = portfolioid;
        this.stockx = stockx;
        this.stocky = stocky;
        this.stockz = stockz;
    }






    public Integer getWatchlistid() {
        return watchlistid;
    }

    public void setWatchlistid(Integer watchlistid) {
        this.watchlistid = watchlistid;
    }

    public Integer getId() {
        return id;
    }

    public void setId(Integer id) {
        this.id = id;
    }

    public String getMarket() {
        return market;
    }

    public void setMarket(String market) {
        this.market = market;
    }

    public String getTicker() {
        return ticker;
    }

    public void setTicker(String ticker) {
        this.ticker = ticker;
    }

    public String getStockName() {
        return stockName;
    }

    public void setStockName(String stockName) {
        this.stockName = stockName;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Double getLastprice() {
        return lastprice;
    }

    public void setLastprice(Double lastprice) {
        this.lastprice = lastprice;
    }

    public Double getTargetprice() {
        return targetprice;
    }

    public void setTargetprice(Double targetprice) {
        this.targetprice = targetprice;
    }

    public Double getEpsttm() {
        return epsttm;
    }

    public void setEpsttm(Double epsttm) {
        this.epsttm = epsttm;
    }

    public Double getPettm() {
        return pettm;
    }

    public void setPettm(Double pettm) {
        this.pettm = pettm;
    }

    public Double getDps() {
        return dps;
    }

    public void setDps(Double dps) {
        this.dps = dps;
    }

    public Double getDivyield() {
        return divyield;
    }

    public void setDivyield(Double divyield) {
        this.divyield = divyield;
    }

    public Double getPb() {
        return pb;
    }

    public void setPb(Double pb) {
        this.pb = pb;
    }

    public Double getBookvalue() {
        return bookvalue;
    }


    public void setBookvalue(Double bookvalue) {
        this.bookvalue = bookvalue;
    }


    public Integer getPortfolioid() {
        return portfolioid;
    }


    public void setPortfolioid(Integer portfolioid) {
        this.portfolioid = portfolioid;
    }

    public Boolean getStockx() {
        return stockx;
    }

    public void setStockx(Boolean stockx) {
        this.stockx = stockx;
    }

    public Boolean getStocky() {
        return stocky;
    }

    public void setStocky(Boolean stocky) {
        this.stocky = stocky;
    }

    public Boolean getStockz() {
        return stockz;
    }

    public void setStockz(Boolean stockz) {
        this.stockz = stockz;
    }

    @Override
    public String toString() {
        return "Stock [id=" + id + ", market=" + market + ", ticker=" + ticker + ", stockName=" + stockName
                + ", description=" + description + ", lastprice=" + lastprice + ", targetprice=" + targetprice
                + ", epsttm=" + epsttm + ", pettm=" + pettm + ", dps=" + dps + ", divyield=" + divyield + ", bookvalue="
                + bookvalue + ", pb=" + pb + ", watchlistid=" + watchlistid + ", portfolioid=" + portfolioid
                + ", stockx=" + stockx + ", stocky=" + stocky + ", stockz=" + stockz + "]";
    }

    




    




    


    

    

    

    
    
}
