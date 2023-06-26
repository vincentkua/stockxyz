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
            SELECT s.id, s.market, s.ticker, s.stock_name, s.lastprice,s.stockx,s.stocky,s.stockz, w.id AS watchlistid, p.id AS portfolioid
            FROM stocklist AS s
            LEFT JOIN watchlist AS w ON s.id = w.stockid AND w.email = ?
            LEFT JOIN portfolio AS p ON s.id = p.stockid AND p.email = ?
            WHERE s.stock_name LIKE ?
            ORDER BY s.stock_name ASC;
            """;

    public List<Stock> getStocks(String search , String email) {
        List<Stock> stocks = new LinkedList<>();
        stocks = jdbcTemplate.query(FINDBYNAME, BeanPropertyRowMapper.newInstance(Stock.class), email, email, "%" + search + "%" );
        System.out.println(stocks);
        return stocks;
    }

    private static final String FINDSTOCKX = """
            SELECT s.id, s.market, s.ticker, s.stock_name, s.lastprice,s.stockx,s.stocky,s.stockz, w.id AS watchlistid, p.id AS portfolioid
            FROM stocklist AS s
            LEFT JOIN watchlist AS w ON s.id = w.stockid AND w.email = ?
            LEFT JOIN portfolio AS p ON s.id = p.stockid AND p.email = ?
            WHERE s.stockx = ?
            ORDER BY s.stock_name ASC;
            """;
    private static final String FINDSTOCKY = """
            SELECT s.id, s.market, s.ticker, s.stock_name, s.lastprice,s.stockx,s.stocky,s.stockz, w.id AS watchlistid, p.id AS portfolioid
            FROM stocklist AS s
            LEFT JOIN watchlist AS w ON s.id = w.stockid AND w.email = ?
            LEFT JOIN portfolio AS p ON s.id = p.stockid AND p.email = ?
            WHERE s.stocky = ?
            ORDER BY s.stock_name ASC;
            """;
    private static final String FINDSTOCKZ = """
            SELECT s.id, s.market, s.ticker, s.stock_name, s.lastprice,s.stockx,s.stocky,s.stockz, w.id AS watchlistid, p.id AS portfolioid
            FROM stocklist AS s
            LEFT JOIN watchlist AS w ON s.id = w.stockid AND w.email = ?
            LEFT JOIN portfolio AS p ON s.id = p.stockid AND p.email = ?
            WHERE s.stockz = ?
            ORDER BY s.stock_name ASC;
            """;

    public List<Stock> getStocksXYZ(String strategy , String email) {
        List<Stock> stocks = new LinkedList<>();
        
        switch (strategy) {
        case "x":
            stocks = jdbcTemplate.query(FINDSTOCKX, BeanPropertyRowMapper.newInstance(Stock.class), email, email, true);
            break;
        case "y":
            stocks = jdbcTemplate.query(FINDSTOCKY, BeanPropertyRowMapper.newInstance(Stock.class), email, email, true);
            break;
        case "z":
            stocks = jdbcTemplate.query(FINDSTOCKZ, BeanPropertyRowMapper.newInstance(Stock.class), email, email, true);
            break;
        default:
            // Do nothing.....
            break;
        }
        System.out.println(stocks);
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

    private static final String FINDPORTFOLIO = """
        select s.id , s.market , s.ticker , s.stock_name ,s.lastprice , p.id as portfolioid 
        from stocklist as s
        left join portfolio as p
        on s.id = p.stockid 
        where p.email = ? and s.stock_name like ? 
        """;

    public List<Stock> getPortfolio(String search , String email) {
    List<Stock> stocks = new LinkedList<>();
    stocks = jdbcTemplate.query(FINDPORTFOLIO, BeanPropertyRowMapper.newInstance(Stock.class), email, "%" + search + "%" );
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

    private static final String ADDPORTFOLIO = "insert into portfolio  (email , stockid) values (? , ?) ";

    public Integer addPortfolio(Integer stockid, String email) {
        Integer rowsupdated = jdbcTemplate.update(ADDPORTFOLIO, email,stockid);
        return rowsupdated;
    }

    private static final String REMOVEWATCHLIST = "delete from watchlist where id= ? and email=? ";

    public Integer removeWatchlist(Integer watchlistid, String email) {
        Integer rowsupdated = jdbcTemplate.update(REMOVEWATCHLIST, watchlistid , email);
        return rowsupdated;
    }
    
    private static final String REMOVEPORTFOLIO = "delete from portfolio where id= ? and email=? ";

    public Integer removePortfolio(Integer portfolioid, String email) {
        Integer rowsupdated = jdbcTemplate.update(REMOVEPORTFOLIO, portfolioid , email);
        return rowsupdated;
    }

    private static final String UPDATESTOCK = "update stocklist set stock_name = ? , description = ?, lastprice = ? , targetprice = ?,  epsttm = ? , pettm = ? , dps = ? , divyield = ? ,bookvalue = ? , pb= ? ,stockx = ? , stocky = ? , stockz = ? where market =? AND ticker=?";

    public Integer updateStock(Stock stock) {
        Integer rowsupdated = jdbcTemplate.update(UPDATESTOCK, stock.getStockName(), stock.getDescription(),
                stock.getLastprice(), stock.getTargetprice(), stock.getEpsttm(), stock.getPettm(), stock.getDps(),
                stock.getDivyield(), stock.getBookvalue(), stock.getPb(),stock.getStockx(),stock.getStocky(),stock.getStockz(), stock.getMarket(), stock.getTicker() );
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

    private static final String UPDATEPASSWORD = "update userlist set hpassword = ?  where email =? ";

    public Integer updateUserPassword(String email , String hpassword ) {
        Integer rowsupdated = jdbcTemplate.update(UPDATEPASSWORD, hpassword , email);
        return rowsupdated;
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
