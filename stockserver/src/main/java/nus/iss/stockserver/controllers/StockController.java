package nus.iss.stockserver.controllers;

import java.io.StringReader;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import jakarta.json.Json;
import jakarta.json.JsonArrayBuilder;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import nus.iss.stockserver.models.Stock;
import nus.iss.stockserver.repository.StockRepository;

@RestController
@RequestMapping(path = "/api")
public class StockController {

    @Autowired
    StockRepository stockRepo;

    @GetMapping(value = "/stocks")
    public ResponseEntity<String> getStocks(@RequestParam String search) {
        List<Stock> stocks = stockRepo.getStocks(search);

        JsonArrayBuilder jsonArray = Json.createArrayBuilder();
        for (Stock x : stocks) {
            JsonObject jsonObject = Json.createObjectBuilder()
                    .add("id", x.getId())
                    .add("market", x.getMarket())
                    .add("ticker", x.getTicker())
                    .add("stockName", x.getStockName())
                    .add("lastprice", x.getLastprice())
                    .build();
            jsonArray.add(jsonObject);
        }

        JsonObject responsejson = Json.createObjectBuilder()
                .add("stocks", jsonArray)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());


    }

    @PostMapping(value = "/stocks")
    public ResponseEntity<String> addStock(@RequestBody String jsonpayload){

        JsonReader reader = Json.createReader(new StringReader(jsonpayload));
        JsonObject json = reader.readObject();
        JsonObject stockjson = json.getJsonObject("stock");

        String market= stockjson.getString("market");
        String ticker= stockjson.getString("ticker");
        String stockName= stockjson.getString("stockName");
        Double lastprice= Double.parseDouble(stockjson.getJsonNumber("lastprice").toString());
        Stock stock = new Stock(null, market, ticker, stockName, lastprice);
        
        Integer rowsupdated = stockRepo.insertStock(stock);

        if (rowsupdated == 1){
            JsonObject responsejson = Json.createObjectBuilder()
            .add("status", "Stock inserted")
            .build();
            return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());            
        }else{
            JsonObject responsejson = Json.createObjectBuilder()
            .add("status", "Failed to add stock")
            .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());      
        }


    }

}
