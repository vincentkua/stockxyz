package nus.iss.stockserver.models;

public class Stock {
    private Integer id;
    private String market;
    private String ticker;
    private String stockName;
    private Double lastprice;
    private Double epslyr;
    private Double epsttm;
    private Double pelyr;
    private Double pettm;
    private Double dps;
    private Double divyield;
    private Double pb;
    

    public Stock() {
    }
    public Stock(Integer id, String market, String ticker, String stockName, Double lastprice, Double epslyr,
            Double epsttm, Double pelyr, Double pettm, Double dps, Double divyield, Double pb) {
        this.id = id;
        this.market = market;
        this.ticker = ticker;
        this.stockName = stockName;
        this.lastprice = lastprice;
        this.epslyr = epslyr;
        this.epsttm = epsttm;
        this.pelyr = pelyr;
        this.pettm = pettm;
        this.dps = dps;
        this.divyield = divyield;
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

    public Double getLastprice() {
        return lastprice;
    }
    public void setLastprice(Double lastprice) {
        this.lastprice = lastprice;
    }
    public Double getEpslyr() {
        return epslyr;
    }
    public void setEpslyr(Double epslyr) {
        this.epslyr = epslyr;
    }
    
    public Double getEpsttm() {
        return epsttm;
    }
    public void setEpsttm(Double epsttm) {
        this.epsttm = epsttm;
    }
    public Double getPelyr() {
        return pelyr;
    }
    public void setPelyr(Double pelyr) {
        this.pelyr = pelyr;
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
    @Override
    public String toString() {
        return "Stock [id=" + id + ", market=" + market + ", ticker=" + ticker + ", stockName=" + stockName
                + ", lastprice=" + lastprice + ", epslyr=" + epslyr + ", epsttm=" + epsttm + ", pelyr=" + pelyr
                + ", pettm=" + pettm + ", dps=" + dps + ", divyield=" + divyield + ", pb=" + pb + "]";
    }

    

    
    
}
