package nus.iss.stockserver.repository;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import nus.iss.stockserver.models.Stock;

@Repository
public class StockRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    private static final String FINDBYNAME = "select * from stocklist where stock_name like ? ";

    public List<Stock> getStocks(String search) {

        List<Stock> stocks = new LinkedList<>();
        stocks = jdbcTemplate.query(FINDBYNAME, BeanPropertyRowMapper.newInstance(Stock.class), "%" + search + "%");
        return stocks;

    }

    private static final String FINDSTOCK = "select * from stocklist where market = ? AND ticker = ? ";

    public Stock getStock(String market, String ticker) {
        Stock stock = new Stock();
        stock = jdbcTemplate.queryForObject(FINDSTOCK, BeanPropertyRowMapper.newInstance(Stock.class), market, ticker);
        return stock;
    }

    private static final String INSERTSTOCK = "insert into stocklist (market , ticker , stock_name ) values (? , ? , ? )";

    public Integer insertStock(String market, String ticker, String stockName) {
        Integer rowsupdated = jdbcTemplate.update(INSERTSTOCK, market, ticker, stockName);
        return rowsupdated;
    }

    private static final String UPDATESTOCK = "update stocklist set stock_name = ? , description = ?, lastprice = ? , targetprice = ?,  epsttm = ? , pettm = ? , dps = ? , divyield = ? ,bookvalue = ? , pb= ? where market =? AND ticker=?";

    public Integer updateStock(Stock stock) {
        Integer rowsupdated = jdbcTemplate.update(UPDATESTOCK, stock.getStockName(), stock.getDescription() , stock.getLastprice(),stock.getTargetprice(),stock.getEpsttm(),stock.getPettm(),stock.getDps(),stock.getDivyield(),stock.getBookvalue(), stock.getPb(),stock.getMarket(),stock.getTicker());
        return rowsupdated;
    }

    private static final String UPDATEALPHA = "update stocklist set  description = ?, targetprice = ? , epsttm = ? , pettm = ? , dps = ? , divyield = ?, bookvalue= ? , pb= ? where market =? AND ticker=?";

    public Integer updateFundamental(Stock stock) {
        Integer rowsupdated = jdbcTemplate.update(UPDATEALPHA, stock.getDescription(),stock.getTargetprice(),stock.getEpsttm(),stock.getPettm(),stock.getDps(),stock.getDivyield(),stock.getBookvalue(),stock.getPb(),stock.getMarket(),stock.getTicker());
        return rowsupdated;
    }

    private static final String UPDATEPRICE = "update stocklist set lastprice = ? where market =? AND ticker=?";

    public Integer updatePrice(Double lastprice, String market, String ticker) {
        Integer rowsupdated = jdbcTemplate.update(UPDATEPRICE, lastprice, market, ticker);
        return rowsupdated;
    }

    private static final String UPDATEPRICEANDTARGET = "update stocklist set lastprice = ?, targetprice = ? , pettm = ? , pb = ? , divyield = ?  where market =? AND ticker=?";

    public Integer updatePriceAndTarget(Double lastprice,Double targetprice, Double pettm, Double pb , Double divyield, String market, String ticker) {
        Integer rowsupdated = jdbcTemplate.update(UPDATEPRICEANDTARGET, lastprice, targetprice,pettm,pb,divyield, market, ticker);
        return rowsupdated;
    }

    private static final String DELETESTOCK = "delete from stocklist where id = ?";
    public Integer deleteStock(Integer id){
        Integer rowsupdated = jdbcTemplate.update(DELETESTOCK, id);
        return rowsupdated;

    }

}
