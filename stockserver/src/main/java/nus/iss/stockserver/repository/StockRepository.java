package nus.iss.stockserver.repository;

import java.util.LinkedList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import nus.iss.stockserver.models.Account;
import nus.iss.stockserver.models.Stock;

@Repository
public class StockRepository {

    @Autowired
    JdbcTemplate jdbcTemplate;

    // private static final String FINDBYNAME = "select * from stocklist where stock_name like ? ";

    // public List<Stock> getStocks(String search) {

    //     List<Stock> stocks = new LinkedList<>();
    //     stocks = jdbcTemplate.query(FINDBYNAME, BeanPropertyRowMapper.newInstance(Stock.class), "%" + search + "%");
    //     return stocks;

    // }

    private static final String FINDBYNAME = """
            select s.id , s.market , s.ticker , s.stock_name ,s.lastprice , w.id as watchlistid 
            from stocklist as s
            left join watchlist as w
            on s.id = w.stockid and  w.email = ?
            where s.stock_name like ? 
            """;

    public List<Stock> getStocks(String search , String email) {
        List<Stock> stocks = new LinkedList<>();
        stocks = jdbcTemplate.query(FINDBYNAME, BeanPropertyRowMapper.newInstance(Stock.class), email, "%" + search + "%" );
        // System.out.println(stocks);
        return stocks;
    }

    private static final String FINDWATCHLIST = """
            select s.id , s.market , s.ticker , s.stock_name ,s.lastprice , w.id as watchlistid 
            from stocklist as s
            left join watchlist as w
            on s.id = w.stockid 
            where w.email = ? and s.stock_name like ? 
            """;

    public List<Stock> getWatchlist(String search , String email) {
        List<Stock> stocks = new LinkedList<>();
        stocks = jdbcTemplate.query(FINDWATCHLIST, BeanPropertyRowMapper.newInstance(Stock.class), email, "%" + search + "%" );
        // System.out.println(stocks);
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

    private static final String ADDWATCHLIST = "insert into watchlist  (email , stockid) values (? , ?) ";

    public Integer addWatchlist(Integer stockid, String email) {
        Integer rowsupdated = jdbcTemplate.update(ADDWATCHLIST, email,stockid);
        return rowsupdated;
    }

    private static final String REMOVEWATCHLIST = "delete from watchlist where id= ? and email=? ";

    public Integer removeWatchlist(Integer watchlistid, String email) {
        Integer rowsupdated = jdbcTemplate.update(REMOVEWATCHLIST, watchlistid , email);
        return rowsupdated;
    }

    private static final String UPDATESTOCK = "update stocklist set stock_name = ? , description = ?, lastprice = ? , targetprice = ?,  epsttm = ? , pettm = ? , dps = ? , divyield = ? ,bookvalue = ? , pb= ? where market =? AND ticker=?";

    public Integer updateStock(Stock stock) {
        Integer rowsupdated = jdbcTemplate.update(UPDATESTOCK, stock.getStockName(), stock.getDescription(),
                stock.getLastprice(), stock.getTargetprice(), stock.getEpsttm(), stock.getPettm(), stock.getDps(),
                stock.getDivyield(), stock.getBookvalue(), stock.getPb(), stock.getMarket(), stock.getTicker());
        return rowsupdated;
    }

    private static final String UPDATEALPHA = "update stocklist set  description = ?, targetprice = ? , epsttm = ? , pettm = ? , dps = ? , divyield = ?, bookvalue= ? , pb= ? where market =? AND ticker=?";

    public Integer updateFundamental(Stock stock) {
        Integer rowsupdated = jdbcTemplate.update(UPDATEALPHA, stock.getDescription(), stock.getTargetprice(),
                stock.getEpsttm(), stock.getPettm(), stock.getDps(), stock.getDivyield(), stock.getBookvalue(),
                stock.getPb(), stock.getMarket(), stock.getTicker());
        return rowsupdated;
    }

    private static final String UPDATEPRICE = "update stocklist set lastprice = ? where market =? AND ticker=?";

    public Integer updatePrice(Double lastprice, String market, String ticker) {
        Integer rowsupdated = jdbcTemplate.update(UPDATEPRICE, lastprice, market, ticker);
        return rowsupdated;
    }

    private static final String UPDATEPRICEANDFUNDAMENTAL = "update stocklist set lastprice = ? , pettm = ? , pb = ? , divyield = ?  where market =? AND ticker=?";

    public Integer updatePriceAndFundamental(Double lastprice, Double pettm, Double pb, Double divyield, String market,
            String ticker) {
        Integer rowsupdated = jdbcTemplate.update(UPDATEPRICEANDFUNDAMENTAL, lastprice, pettm, pb, divyield, market,
                ticker);
        return rowsupdated;
    }

    private static final String DELETESTOCK = "delete from stocklist where id = ?";

    public Integer deleteStock(Integer id) {
        Integer rowsupdated = jdbcTemplate.update(DELETESTOCK, id);
        return rowsupdated;

    }

    private static final String INSERTUSER = "insert into userlist  (email , hpassword , roles) values (? , ? , ?) ";

    public Integer addUser(String email, String hpassword) {

        try {
            Integer rowsupdated = jdbcTemplate.update(INSERTUSER, email, hpassword, "user");
            return rowsupdated;
        } catch (Exception e) {
            System.out.println("error while insert user :" + e.getMessage());
            return 0;
        }

    }

    private static final String GETUSER = "select * from  userlist where email = ?";

    public Account getUser(String email) {

        try {
            Account account = new Account();
            account = jdbcTemplate.queryForObject(GETUSER, BeanPropertyRowMapper.newInstance(Account.class), email);
            return account;
        } catch (Exception e) {
            System.out.println("account not found :" + e.getMessage());
            return null;
        }

    }

}
