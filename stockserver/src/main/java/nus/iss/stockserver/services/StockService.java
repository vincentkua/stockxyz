package nus.iss.stockserver.services;

import java.io.StringReader;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.MediaType;
import org.springframework.http.RequestEntity;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponentsBuilder;

import jakarta.json.Json;
import jakarta.json.JsonObject;
import jakarta.json.JsonReader;
import nus.iss.stockserver.models.Stock;
import nus.iss.stockserver.repository.StockRepository;

@Service
public class StockService {

        public final static String ALPHAURL = "https://www.alphavantage.co/query";
        public final static String TWELVEURL = "https://api.twelvedata.com/price";

        @Autowired
        StockRepository stockRepo;

        @Value("${alphavantage.key}")
        private String alphaapikey;

        @Value("${twelvedata.key}")
        private String twelveapikey;

        public Integer getAlphaFundamental(String market, String ticker) {

                String url = UriComponentsBuilder.fromUriString(ALPHAURL)
                                .queryParam("function", "OVERVIEW")
                                .queryParam("symbol", ticker)
                                .queryParam("apikey", alphaapikey)
                                .toUriString();

                RequestEntity<Void> req = RequestEntity.get(url)
                                .accept(MediaType.APPLICATION_JSON)
                                .build();

                RestTemplate template = new RestTemplate();
                ResponseEntity<String> resp = template.exchange(req, String.class);
                String payload = resp.getBody();
                JsonReader reader = Json.createReader(new StringReader(payload));
                JsonObject json = reader.readObject();
                String description = json.getString("Description");
                Double pettm = Double.parseDouble(json.getString("TrailingPE").equals("-") ? "0" : json.getString("TrailingPE"));
                Double epsttm = Double.parseDouble(json.getString("DilutedEPSTTM"));
                Double dps = Double.parseDouble(json.getString("DividendPerShare"));
                Double divyield = Double.parseDouble(json.getString("DividendYield"));
                Double bookvalue = Double.parseDouble(json.getString("BookValue"));                
                Double pb = Double.parseDouble(json.getString("PriceToBookRatio"));
                Double targetprice = Double.parseDouble(json.getString("AnalystTargetPrice"));
                Stock stock = new Stock(null,market,ticker,null,description,null,targetprice,epsttm,pettm,dps,divyield,bookvalue,pb);
                System.out.println("########################");
                System.out.println("AlphaAPI Called");
                System.out.println("Ticker : " + ticker);
                System.out.println("Stock Data : " + stock);

                Integer rowsupdated = stockRepo.updateFundamental(stock);

                return rowsupdated;

        }

        public Integer getTwelveDataPrice(String market, String ticker) {
                String ticker2 = ticker;
                if (!market.equals("NASDAQ")){
                        ticker2 = ticker + ":" + market;
                }

                String url = UriComponentsBuilder.fromUriString(TWELVEURL)
                                .queryParam("symbol", ticker2)
                                .queryParam("apikey", twelveapikey)
                                .toUriString();

                RequestEntity<Void> req = RequestEntity.get(url)
                                .accept(MediaType.APPLICATION_JSON)
                                .build();

                RestTemplate template = new RestTemplate();
                ResponseEntity<String> resp = template.exchange(req, String.class);
                String payload = resp.getBody();
                JsonReader reader = Json.createReader(new StringReader(payload));
                JsonObject json = reader.readObject();
                Double price = Double.parseDouble(json.getString("price"));

                System.out.println("########################");
                System.out.println("Twelvedata Api Called");
                System.out.println("Ticker : " + ticker);
                System.out.println("Stock Price :" + price);

                Integer rowsupdated = stockRepo.updatePrice(price,market,ticker);

                return rowsupdated;
        }
}
