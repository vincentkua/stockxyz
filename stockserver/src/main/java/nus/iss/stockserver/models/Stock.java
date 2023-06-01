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
    

    public Stock() {
    }


    public Stock(Integer id, String market, String ticker, String stockName, String description, Double lastprice,
            Double targetprice, Double epsttm, Double pettm, Double dps, Double divyield, Double bookvalue, Double pb) {
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


    @Override
    public String toString() {
        return "Stock [id=" + id + ", market=" + market + ", ticker=" + ticker + ", stockName=" + stockName
                + ", description=" + description + ", lastprice=" + lastprice + ", targetprice=" + targetprice
                + ", epsttm=" + epsttm + ", pettm=" + pettm + ", dps=" + dps + ", divyield=" + divyield + ", bookvalue="
                + bookvalue + ", pb=" + pb + "]";
    }

    


    

    

    

    
    
}
