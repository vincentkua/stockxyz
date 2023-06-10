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

    public Document findPriceAsBSONDocument(String market, String ticker) {
        Document pricedata = new Document();
        Query query = Query.query(Criteria.where("market").is(market).and("ticker").is(ticker));
        pricedata = mongoTemplate.findOne(query, Document.class, "pricedb");
        // System.out.println("Price BSON Data");
        // System.out.println(pricedata.toJson());
        return pricedata;
    }

    public Document findEarningAsBSONDocument(String market, String ticker) {
        Document earningdata = new Document();
        Query query = Query.query(Criteria.where("market").is(market).and("ticker").is(ticker));
        earningdata = mongoTemplate.findOne(query, Document.class, "earningdb");
        // System.out.println("Earning BSON Data");
        // System.out.println(pricedata.toJson());
        return earningdata;
    }

    public Document findBalanceAsBSONDocument(String market, String ticker) {
        Document balancedata = new Document();
        Query query = Query.query(Criteria.where("market").is(market).and("ticker").is(ticker));
        balancedata = mongoTemplate.findOne(query, Document.class, "balancedb");
        // System.out.println("Earning BSON Data");
        // System.out.println(pricedata.toJson());
        return balancedata;
    }

    public Document findEpsDpsAsBSONDocument(String market, String ticker) {
        Document chartdata = new Document();
        Query query = Query.query(Criteria.where("market").is(market).and("ticker").is(ticker));
        chartdata = mongoTemplate.findOne(query, Document.class, "epsdpsdb");
        // System.out.println("Earning BSON Data");
        // System.out.println(pricedata.toJson());
        return chartdata;
    }

    public Boolean upsertStockPriceData(String market, String ticker, List<String> labels, List<Double> pricedata) {

        Query query = new Query(Criteria.where("market").is(market).and("ticker").is(ticker));

        Update update = new Update()
                .set("market", market)
                .set("ticker", ticker)
                .set("pricechartlabel", labels)
                .set("pricechartdata", pricedata);

        FindAndModifyOptions options = new FindAndModifyOptions().upsert(true);
        Document newDoc = mongoTemplate.findAndModify(query, update, options, Document.class, "pricedb");

        if (newDoc != null) {
            return true;
        } else {
            return false;
        }

    }

    public Boolean upsertEarningData(String market, String ticker, List<String> label, List<Double> revenue,
            List<Double> grossprofit, List<Double> netprofit) {

        Query query = new Query(Criteria.where("market").is(market).and("ticker").is(ticker));

        Update update = new Update()
                .set("market", market)
                .set("ticker", ticker)
                .set("chartlabel", label)
                .set("chartrevenue", revenue)
                .set("chartgrossprofit", grossprofit)
                .set("chartnetprofit", netprofit);

        FindAndModifyOptions options = new FindAndModifyOptions().upsert(true);
        Document newDoc = mongoTemplate.findAndModify(query, update, options, Document.class, "earningdb");

        if (newDoc != null) {
            return true;
        } else {
            return false;
        }

    }

    public Boolean upsertBalanceData(String market, String ticker, List<String> label, List<Double> asset,
            List<Double> liability, List<Double> debt) {

        Query query = new Query(Criteria.where("market").is(market).and("ticker").is(ticker));

        Update update = new Update()
                .set("market", market)
                .set("ticker", ticker)
                .set("chartlabel", label)
                .set("chartasset", asset)
                .set("chartliability", liability)
                .set("chartdebt", debt);

        FindAndModifyOptions options = new FindAndModifyOptions().upsert(true);
        Document newDoc = mongoTemplate.findAndModify(query, update, options, Document.class, "balancedb");

        if (newDoc != null) {
            return true;
        } else {
            return false;
        }

    }

    public Boolean upsertEpsDpsData(String market, String ticker, List<String> label, List<Double> eps, List<Double> dps) {

        Query query = new Query(Criteria.where("market").is(market).and("ticker").is(ticker));

        Update update = new Update()
                .set("market", market)
                .set("ticker", ticker)
                .set("chartlabel", label)
                .set("charteps", eps)
                .set("chartdps", dps);

        FindAndModifyOptions options = new FindAndModifyOptions().upsert(true);
        Document newDoc = mongoTemplate.findAndModify(query, update, options, Document.class, "epsdpsdb");

        if (newDoc != null) {
            return true;
        } else {
            return false;
        }

    }

}
