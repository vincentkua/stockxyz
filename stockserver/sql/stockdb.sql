create database stockdb;
use stockdb;

create table stocklist(
id int auto_increment not null,
market varchar(10) not null,
ticker varchar(10) not null,
stock_name varchar(255),
description longtext,
lastprice double,
targetprice double,
epsttm double,
pettm double,
dps double,
divyield double,
bookvalue double,
pb double,
stockx boolean,
stocky boolean,
stockz boolean,
constraint stocklist_pk primary key (id),
CONSTRAINT market_ticker_unique UNIQUE (market, ticker)
);

insert into stocklist (market , ticker , stock_name) values ("NASDAQ" , "AAPL" , "Apple" );
insert into stocklist (market , ticker , stock_name) values ("NASDAQ" , "TSLA" , "Tesla Motor" );
insert into stocklist (market , ticker , stock_name) values ("NASDAQ" , "GOOGL" , "Alphabet" );
insert into stocklist (market , ticker , stock_name) values ("NASDAQ" , "MSFT" , "Microsoft" );
insert into stocklist (market , ticker , stock_name) values ("NASDAQ" , "META" , "Meta Platforms" );
insert into stocklist (market , ticker , stock_name) values ("SGX" , "D05" , "DBS Bank" );

create table userlist(
id int auto_increment not null,
email varchar(255) unique not null,
hpassword varchar(255) not null,
roles varchar(255),
constraint userlist_pk primary key (id)
);

create table watchlist(  
id int not null auto_increment,  
email varchar(100) not null,  
stockid int not null,   
constraint watchlist_pk primary key (id),
constraint watchlist_email_fk foreign key (email) references userlist(email),
constraint watchlist_stockid_fk foreign key (stockid) references stocklist(id),
CONSTRAINT email_stockid_unique UNIQUE (email, stockid)
);

create table portfolio(  
id int not null auto_increment,  
email varchar(100) not null,  
stockid int not null,  
constraint portfolio_pk primary key (id),
constraint portfolio_email_fk foreign key (email) references userlist(email),
constraint portfolio_stockid_fk foreign key (stockid) references stocklist(id),
CONSTRAINT email_stockid_unique UNIQUE (email, stockid)
);

