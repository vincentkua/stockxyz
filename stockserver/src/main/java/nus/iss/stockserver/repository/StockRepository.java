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

    private static final String INSERTSTOCK = "insert into stocklist (market , ticker , stock_name , lastprice) values (? , ? , ? , ?)";
    public Integer insertStock(Stock stock){
        Integer rowsupdated = jdbcTemplate.update(INSERTSTOCK,stock.getMarket(),stock.getTicker(),stock.getStockName(),stock.getLastprice());
        return rowsupdated;
    }


}
