package nus.iss.stockserver.services;

import java.io.IOException;

import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.jsoup.nodes.Element;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import nus.iss.stockserver.repository.StockRepository;

@Service
public class WebScraperService {

    @Autowired
    StockRepository stockRepo;

    public Integer crawlYahooPrice(String market , String ticker){
        String URL;
        if (market.equals("SGX")){
            URL = "https://sg.finance.yahoo.com/quote/" + ticker + ".SI";
        }else{
            URL = "https://sg.finance.yahoo.com/quote/" + ticker;
        }

        try {
            Document doc = Jsoup.connect(URL)
                    .userAgent("Mozilla")
                    .timeout(5000)
                    .get();

            Element priceElement = doc.select("fin-streamer[data-field=regularMarketPrice]").first();
            String price = priceElement.text();
            System.out.println("Price: " + price);

            Element targetElement = doc.select("td[data-test=ONE_YEAR_TARGET_PRICE-value]").first();
            String target = targetElement.text();
            System.out.println("Target: " + target);

            Double lastprice = Double.parseDouble(price.equals("N/A") ? "0" : price);
            Double targetprice = Double.parseDouble(target.equals("N/A") ? "0" : target);

            Integer rowsupdated = stockRepo.updatePriceAndTarget(lastprice, targetprice, market, ticker);

            return rowsupdated;



        } catch (IOException e) {
            System.out.println(e.getMessage());
            return 0;
        }

    
        // String URL2 =
        // "https://sg.finance.yahoo.com/quote/D05.SI/key-statistics?p=D05.SI";
        // try {
        // Document doc2 = Jsoup.connect(URL2)
        // .userAgent("Mozilla")
        // .timeout(5000)
        // .get();
        // // Find the <span>Forward P/E</span>
        // Element spanElement = doc2.select("span:contains(Forward P/E)").first();
        // String forwardPE = spanElement.text();
        // System.out.println(forwardPE);
        // // Find the next <td> element after the <span>Forward P/E</span>
        // Element tdElement = spanElement.parent().nextElementSibling();
        // String value = tdElement.text();
        // System.out.println(value);
        // } catch (IOException e) {
        // System.out.println(e.getMessage());
        // }

    }
    
}
