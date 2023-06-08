package nus.iss.stockserver.repository;

import java.util.List;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.FindAndModifyOptions;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Repository;

@Repository
public class ChartRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    public Document findAllAsBSONDocument(String market, String ticker) {
        Document pricedata = new Document();
        Query query = Query.query(Criteria.where("market").is(market).and("ticker").is(ticker));
        pricedata = mongoTemplate.findOne(query, Document.class, "pricedb");
        System.out.println("BSON Data");
        System.out.println(pricedata.toJson());
        return pricedata;
    }

    public Boolean upsertStockPriceData(String market, String ticker , List<String> labels , List<Double> pricedata) {

        Query query = new Query(Criteria.where("market").is(market).and("ticker").is(ticker));

        Update update = new Update()
                .set("market", market)
                .set("ticker", ticker)
                .set("pricechartlabel", labels)
                .set("pricechartdata", pricedata);

        FindAndModifyOptions options = new FindAndModifyOptions().upsert(true);
        Document newDoc = mongoTemplate.findAndModify(query, update, options, Document.class, "pricedb");

        if (newDoc != null){
            return true;
        }else{
            return false;
        }

    }

}
