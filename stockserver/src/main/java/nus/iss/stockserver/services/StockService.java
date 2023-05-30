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
                System.out.println(json);
                // String description = json.getString("Description");
                Double pettm = Double.parseDouble(json.getString("TrailingPE"));
                Double pelyr = Double.parseDouble(json.getString("PERatio"));
                Double epsttm = Double.parseDouble(json.getString("DilutedEPSTTM"));
                Double epslyr = Double.parseDouble(json.getString("EPS"));
                Double dps = Double.parseDouble(json.getString("DividendPerShare"));
                Double divyield = Double.parseDouble(json.getString("DividendYield"));
                Double pb = Double.parseDouble(json.getString("PriceToBookRatio"));

                Stock stock = new Stock(null, market, ticker, null, null, epslyr, epsttm, pelyr, pettm, dps, divyield,
                                pb);
                System.out.println("######");
                System.out.println(stock);

                Integer rowsupdated = stockRepo.updateFundamental(stock);

                return rowsupdated;

        }

        public Integer getTwelveDataPrice(String market, String ticker) {
                String url = UriComponentsBuilder.fromUriString(TWELVEURL)
                                .queryParam("symbol", ticker)
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
                System.out.println(json);
                Double price = Double.parseDouble(json.getString("price"));

                Integer rowsupdated = stockRepo.updatePrice(price,market,ticker);

                return rowsupdated;
        }
}
