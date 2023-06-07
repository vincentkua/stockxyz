package nus.iss.stockserver.repository;

import org.bson.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Query;
import org.springframework.stereotype.Repository;

@Repository
public class ChartRepository {

    @Autowired
    MongoTemplate mongoTemplate;

    public Document findAllAsBSONDocument(String market , String ticker) { 
        Document pricedata = new Document(); 
        Query query = Query.query(Criteria.where("market").is(market).and("ticker").is(ticker)); 
        pricedata = mongoTemplate.findOne(query, Document.class, "pricedb"); 
        System.out.println("BSON Data");
        System.out.println(pricedata.toJson());
        return pricedata; 
    } 



    
}
