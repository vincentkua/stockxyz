package nus.iss.stockserver.controllers;

import java.io.StringReader;
import java.util.LinkedList;
import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
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
import nus.iss.stockserver.repository.ChartRepository;
import nus.iss.stockserver.repository.StockRepository;
import nus.iss.stockserver.services.StockService;
import nus.iss.stockserver.services.WebScraperService;

@RestController
@RequestMapping(path = "/api")
public class StockController {

    @Autowired
    StockRepository stockRepo;

    @Autowired
    ChartRepository chartRepo;

    @Autowired
    StockService stockSvc;

    @Autowired
    WebScraperService webScraperSvc;

    // =================================================================================
    // Main Page Request (Stock List)
    // =================================================================================
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
                    .add("description", x.getDescription() == null ? "" : x.getDescription())
                    .add("lastprice", x.getLastprice() == null ? 0 : x.getLastprice())
                    .add("targetprice", x.getTargetprice() == null ? 0 : x.getTargetprice())
                    .add("epsttm", x.getEpsttm() == null ? 0 : x.getEpsttm())
                    .add("pettm", x.getPettm() == null ? 0 : x.getPettm())
                    .add("dps", x.getDps() == null ? 0 : x.getDps())
                    .add("divyield", x.getDivyield() == null ? 0 : x.getDivyield())
                    .add("pb", x.getPb() == null ? 0 : x.getPb())
                    .build();
            jsonArray.add(jsonObject);
        }

        JsonObject responsejson = Json.createObjectBuilder()
                .add("stocks", jsonArray)
                .build();

        System.out.println("##################");
        System.out.println("Stocks List Requested " + search);

        return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
    }

    // =================================================================================
    // Stock Detail Page Request
    // =================================================================================

    @GetMapping(value = "/stock")
    public ResponseEntity<String> getStock(@RequestParam String market, @RequestParam String ticker) {
        if (market.equals("NASDAQ") || market.equals("NYSE")) {
            try {
                stockSvc.getTwelveDataPriceAndCalculateRatio(market, ticker);

            } catch (Exception e) {
                System.out.println("######################");
                System.out.println("API calling method failed!!!");
                System.out.println(e.getMessage());
            }
        } else {
            try {
                webScraperSvc.scrapeYahooPrice(market, ticker);
            } catch (Exception e) {
                System.out.println("######################");
                System.out.println("Yahoo Web Scrapper method failed!!!");
                System.out.println(e.getMessage());
            }
        }

        Stock stock = stockRepo.getStock(market, ticker);
        JsonObject jsonObject = Json.createObjectBuilder()
                .add("id", stock.getId())
                .add("market", stock.getMarket())
                .add("ticker", stock.getTicker())
                .add("stockName", stock.getStockName())
                .add("description", stock.getDescription() == null ? "" : stock.getDescription())
                .add("lastprice", stock.getLastprice() == null ? 0 : stock.getLastprice())
                .add("targetprice", stock.getTargetprice() == null ? 0 : stock.getTargetprice())
                .add("epsttm", stock.getEpsttm() == null ? 0 : stock.getEpsttm())
                .add("pettm", stock.getPettm() == null ? 0 : stock.getPettm())
                .add("dps", stock.getDps() == null ? 0 : stock.getDps())
                .add("divyield", stock.getDivyield() == null ? 0 : stock.getDivyield())
                .add("bookvalue", stock.getBookvalue() == null ? 0 : stock.getBookvalue())
                .add("pb", stock.getPb() == null ? 0 : stock.getPb())
                .build();

        return ResponseEntity.status(HttpStatus.OK).body(jsonObject.toString());
    }

    @GetMapping(value = "/fundamentalapi")
    public ResponseEntity<String> getStockApi(@RequestParam String market, @RequestParam String ticker) {

        Integer rowsupdated = stockSvc.getAlphaFundamental(market, ticker);

        if (rowsupdated == 1) {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Stock Fundamental updated")
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
                    .add("status", "Stock Price updated")
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
        } else {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Failed to update stock")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }

    }

    @GetMapping(value = "/webscraper")
    public ResponseEntity<String> getFromYahoo(@RequestParam String market, @RequestParam String ticker) {

        Integer rowsupdated = webScraperSvc.scrapeYahooPrice(market, ticker);

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

    @PostMapping(value = "/delete/{id}")
    public ResponseEntity<String> deleteStock(@PathVariable Integer id) {
        System.out.println("Delete Request Received..." + id);

        Integer rowdeleted = stockRepo.deleteStock(id);

        if (rowdeleted == 1) {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Stock deleted")
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());
        } else {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Failed to delete stock")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }
    }

    @GetMapping(value = "/pricechart")
    public ResponseEntity<String> getPriceData(@RequestParam String market, @RequestParam String ticker) {
        System.out.println("Get Price Chart Request Received");
        try {
            Document pricedata = chartRepo.findPriceAsBSONDocument(market, ticker);
            return ResponseEntity.status(HttpStatus.OK).body(pricedata.toJson());
        } catch (Exception e) {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Price Data Not Found")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }
    }

    @GetMapping(value = "/earningchart")
    public ResponseEntity<String> getEarningData(@RequestParam String market, @RequestParam String ticker) {
        System.out.println("Get Earning Chart Request Received");

        try {
            Document pricedata = chartRepo.findEarningAsBSONDocument(market, ticker);
            return ResponseEntity.status(HttpStatus.OK).body(pricedata.toJson());
        } catch (Exception e) {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Price Data Not Found")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }
    }

    @PostMapping(value = "/pricechart")
    public ResponseEntity<String> upsertPriceData(@RequestBody String jsonpayload) {
        System.out.println("Update Chart Request Received");
        JsonReader reader = Json.createReader(new StringReader(jsonpayload));
        JsonObject pricedatajson = reader.readObject();

        List<String> pricechartlabel = new LinkedList<>();
        List<Double> pricechartdata = new LinkedList<>();

        String market = pricedatajson.getString("market");
        String ticker = pricedatajson.getString("ticker");
        String chartlabel = pricedatajson.getString("pricechartlabel");
        String chartdata = pricedatajson.getString("pricechartdata");

        String[] labelsArray = chartlabel.split("\\s+|\\t|\\n");
        for (int i = 0; i < labelsArray.length; i++) {
            System.out.println(labelsArray[i]);
            pricechartlabel.add(labelsArray[i]);
        }

        String[] dataArray = chartdata.split("\\s+|\\t|\\n");
        for (int i = 0; i < dataArray.length; i++) {
            System.out.println(dataArray[i]);
            pricechartdata.add(Double.parseDouble(dataArray[i]));
        }

        try {
            chartRepo.upsertStockPriceData(market, ticker, pricechartlabel, pricechartdata);

            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Price Chart Updated")
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());

        } catch (Exception e) {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Unable to Update")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }
    }

    @PostMapping(value = "/earningchart")
    public ResponseEntity<String> upsertEarningData(@RequestBody String jsonpayload) {
        System.out.println("Update Earning Chart Request Received");
        JsonReader reader = Json.createReader(new StringReader(jsonpayload));
        JsonObject pricedatajson = reader.readObject();


        List<String> labelList = new LinkedList<>();
        List<Double> revenueList= new LinkedList<>();
        List<Double> grossprofitList = new LinkedList<>();
        List<Double> netprofitList= new LinkedList<>();

        String market = pricedatajson.getString("market");
        String ticker = pricedatajson.getString("ticker");
        String label = pricedatajson.getString("label");
        String revenue = pricedatajson.getString("revenue");
        String grossprofit = pricedatajson.getString("grossprofit");
        String netprofit = pricedatajson.getString("netprofit");


        String[] labelArray = label.split("\\s+|\\t|\\n");
        for (int i = 0; i < labelArray.length; i++) {
            System.out.println(labelArray[i]);
            labelList.add(labelArray[i]);
        }

        String[] revenueArray = revenue.replace(",", "").split("\\s+|\\t|\\n");
        for (int i = 0; i < revenueArray.length; i++) {
            System.out.println(revenueArray[i]);
            revenueList.add(Double.parseDouble(revenueArray[i]));
        }

        String[] grossprofitArray = grossprofit.replace(",", "").split("\\s+|\\t|\\n");
        for (int i = 0; i < grossprofitArray.length; i++) {
            System.out.println(grossprofitArray[i]);
            grossprofitList.add(Double.parseDouble(grossprofitArray[i]));
        }

        String[] netprofitArray = netprofit.replace(",", "").split("\\s+|\\t|\\n");
        for (int i = 0; i < netprofitArray.length; i++) {
            System.out.println(netprofitArray[i]);
            netprofitList.add(Double.parseDouble(netprofitArray[i]));
        }

        try {
            chartRepo.upsertEarningData(market, ticker, labelList, revenueList , grossprofitList,netprofitList );
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Earning Chart Updated")
                    .build();
            return ResponseEntity.status(HttpStatus.OK).body(responsejson.toString());

        } catch (Exception e) {
            JsonObject responsejson = Json.createObjectBuilder()
                    .add("status", "Unable to Update")
                    .build();
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(responsejson.toString());
        }


    }

    // =================================================================================
    // Add Stock Page
    // =================================================================================

    @PostMapping(value = "/stocks")
    public ResponseEntity<String> addStock(@RequestBody String jsonpayload) {

        JsonReader reader = Json.createReader(new StringReader(jsonpayload));
        JsonObject json = reader.readObject();
        JsonObject stockjson = json.getJsonObject("stock");

        String market = stockjson.getString("market");
        String ticker = stockjson.getString("ticker");
        String stockName = stockjson.getString("stockName");

        Integer rowsupdated = stockRepo.insertStock(market, ticker, stockName);

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

    // =================================================================================
    // Update Stock Page
    // =================================================================================

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
        Double pettm = Double.parseDouble(stockjson.getJsonNumber("pettm").toString());
        Double dps = Double.parseDouble(stockjson.getJsonNumber("dps").toString());
        Double divyield = Double.parseDouble(stockjson.getJsonNumber("divyield").toString());
        Double bookvalue = Double.parseDouble(stockjson.getJsonNumber("bookvalue").toString());
        Double pb = Double.parseDouble(stockjson.getJsonNumber("pb").toString());
        Stock stock = new Stock(null, market, ticker, stockName, description, lastprice, targetprice, epsttm, pettm,
                dps, divyield, bookvalue, pb);

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
}
