package nus.iss.stockserver.models;

public class Stock {
    private Integer id;
    private String market;
    private String ticker;
    private String stockName;
    private Double lastprice;
    public Stock() {
    }
    public Stock(Integer id, String market, String ticker, String stockName, Double lastprice) {
        this.id = id;
        this.market = market;
        this.ticker = ticker;
        this.stockName = stockName;
        this.lastprice = lastprice;
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
    @Override
    public String toString() {
        return "Stock [id=" + id + ", market=" + market + ", ticker=" + ticker + ", stockName=" + stockName
                + ", lastprice=" + lastprice + "]";
    }

    

    
    
}
