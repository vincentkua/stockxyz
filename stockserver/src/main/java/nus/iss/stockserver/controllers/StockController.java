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
import nus.iss.stockserver.services.StockService;

@RestController
@RequestMapping(path = "/api")
public class StockController {

    @Autowired
    StockRepository stockRepo;

    @Autowired
    StockService stockSvc;

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
                    .add("description", x.getDescription()== null ? "" : x.getDescription())
                    .add("lastprice", x.getLastprice()== null ? 0 : x.getLastprice())
                    .add("targetprice", x.getTargetprice()== null ? 0 : x.getTargetprice())
                    .add("epsttm", x.getEpsttm() == null ? 0 : x.getEpsttm())
                    .add("pettm", x.getPettm() == null ? 0 : x.getPettm())
                    .add("pefwd", x.getPefwd() == null ? 0 : x.getPefwd())
                    .add("dps", x.getDps() == null ? 0 : x.getDps())
                    .add("divyield", x.getDivyield() == null ? 0 : x.getDivyield())
                    .add("pb", x.getPb() == null ? 0 : x.getPb())
                    .build();
            jsonArray.add(jsonObject);
        }

        JsonObject responsejson = Json.createObjectBuilder()
                .add("stocks", jsonArray)
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
    }

    @GetMapping(value = "/stock")
    public ResponseEntity<String> getStock(@RequestParam String market, @RequestParam String ticker) {

        Stock stock = stockRepo.getStock(market, ticker);
        // System.out.println(stock);

        JsonObject jsonObject = Json.createObjectBuilder()
                .add("id", stock.getId())
                .add("market", stock.getMarket())
                .add("ticker", stock.getTicker())
                .add("stockName", stock.getStockName())
                .add("description", stock.getDescription()== null ? "" : stock.getDescription())
                .add("lastprice", stock.getLastprice()== null ? 0 : stock.getLastprice())
                .add("targetprice", stock.getTargetprice()== null ? 0 : stock.getTargetprice())
                .add("epsttm", stock.getEpsttm() == null ? 0 : stock.getEpsttm())
                .add("pefwd", stock.getPefwd() == null ? 0 : stock.getPefwd())
                .add("pettm", stock.getPettm() == null ? 0 : stock.getPettm())
                .add("dps", stock.getDps() == null ? 0 : stock.getDps())
                .add("divyield", stock.getDivyield() == null ? 0 : stock.getDivyield())
                .add("pb", stock.getPb() == null ? 0 : stock.getPb())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(jsonObject.toString());
    }

    @PostMapping(value = "/stocks")
    public ResponseEntity<String> addStock(@RequestBody String jsonpayload) {

        JsonReader reader = Json.createReader(new StringReader(jsonpayload));
        JsonObject json = reader.readObject();
        JsonObject stockjson = json.getJsonObject("stock");

        String market = stockjson.getString("market");
        String ticker = stockjson.getString("ticker");
        String stockName = stockjson.getString("stockName");
        

        Integer rowsupdated = stockRepo.insertStock(market,ticker,stockName);

        if (rowsupdated == 1) {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Stock inserted")
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
        } else {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Failed to add stock")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }

    }

    @PostMapping(value = "/update")
    public ResponseEntity<String> updateStock(@RequestBody String jsonpayload) {
        JsonReader reader = Json.createReader(new StringReader(jsonpayload));
        JsonObject json = reader.readObject();
        JsonObject stockjson = json.getJsonObject("stock");

        String market = stockjson.getString("market");
        String ticker = stockjson.getString("ticker");
        String stockName = stockjson.getString("stockName");
        String description = stockjson.getString("description");
        Double lastprice = Double.parseDouble(stockjson.getJsonNumber("lastprice").toString());
        Double targetprice = Double.parseDouble(stockjson.getJsonNumber("targetprice").toString());
        Double epsttm = Double.parseDouble(stockjson.getJsonNumber("epsttm").toString());
        Double pefwd = Double.parseDouble(stockjson.getJsonNumber("pefwd").toString());
        Double pettm = Double.parseDouble(stockjson.getJsonNumber("pettm").toString());
        Double dps = Double.parseDouble(stockjson.getJsonNumber("dps").toString());
        Double divyield = Double.parseDouble(stockjson.getJsonNumber("divyield").toString());
        Double pb = Double.parseDouble(stockjson.getJsonNumber("pb").toString());
        Stock stock = new Stock(null, market,ticker,stockName,description,lastprice,targetprice,epsttm,pefwd,pettm,dps,divyield,pb);

        Integer rowsupdated = stockRepo.updateStock(stock);

        if (rowsupdated == 1) {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Stock updated")
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
        } else {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Failed to update stock")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }
    }

    @GetMapping(value = "/fundamentalapi")
    public ResponseEntity<String> getStockApi(@RequestParam String market, @RequestParam String ticker) {

        Integer rowsupdated = stockSvc.getAlphaFundamental(market, ticker);

        if (rowsupdated == 1) {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Stock updated")
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
        } else {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Failed to update stock")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }
    }

    @GetMapping(value = "/priceapi")
    public ResponseEntity<String> getPriceApi(@RequestParam String market, @RequestParam String ticker) {

        Integer rowsupdated = stockSvc.getTwelveDataPrice(market, ticker);

        if (rowsupdated == 1) {
        JsonObject responsejson = Json.createObjectBuilder()
        .add("status", "Stock updated")
        .build();
        return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
        } else {
        JsonObject responsejson = Json.createObjectBuilder()
        .add("status", "Failed to update stock")
        .build();
        return
        ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }

    }

}
