# StockXYZ

StockXYZ is a stock investment references tools. Stock Fundamental data and charts are provided to analyze trends, identify patterns, and make data-driven decisions. Recomended stock are recommended based on growths, undervalued and dividends strategies.

## Description

Create by Kua Zi Lin for IBF B2 Mini-Project (TFIP 2023 Batch 2 Jan 03 2023). This project consist of 2 parts , client(Angular) and server(Spring-boot). SQL Database Initialisation code was included in the stockserver folder. Both Client App and Server has been hosted on [https://stockxyz-production.up.railway.app/] and [https://stockxyz.online/]
 

## Table of Contents

- [Feature](#feature)
- [Requirements](#requirements)
- [References](#references)

## Feature

Key Features:
- Stock Fundamental
  - Fundamental from alphavantage api
  - Latest Price From twelvedata api and yahoo finance
- Stock Charts (Annual Data for > 10 years records provided)
  - Price Charts (Basic / Trading View)
  - Earning Chart
  - Balance Chart 
  - EPS vs DPS Chart
  - Cashflow Chart
- Stock Recommendation
  - Growths Stocks
  - Undervalued Stocks
  - Dividends Stock
- Watchlist and Portfolio Management
- Web Notification
  - Buy / Sell Signal
  - Important Updates


## Requirements

Optional Requirements implemented:
- Firebase web notification with frontend web notification (10pts)
  - Used for buy/sell signal or important update
- Sending email (5pts)
  - Used for password reset component
  - Reset token will be sent to the email when requested
- Use Spring Boot security with JWT to authenticate and authorize Angular request (5pts)
  - Basic security setting implemented
  - JWT token validation required for every api request.
- Use a UI component framework - eg. ng-bootstrap, Material, PrimeNG (4pts)
  - ng material was used in this project
- Adding a service worker to precache application assets (4pts)
  - service worker was added and precache all the html/js/css/assets
- Apply a domain name and configure your application to use the domain name (3pts)
  - domain name > [https://stockxyz.online/]


## References
- Api 1 > alphavantage [https://www.alphavantage.co/documentation/]
- Api 2 > twelvedata api [https://twelvedata.com/docs#getting-started]
- Web scrapper > jsoup [https://www.baeldung.com/java-with-jsoup]
- Password Hashing > Bcrypt [https://www.baeldung.com/java-password-hashing]
- Authentication 1 > Java Security [https://www.baeldung.com/java-security-overview]
- Authentication 2 > JWT Token [https://www.tutorialspoint.com/spring_security/spring_security_with_jwt.htm]
- Email > Java Angus [https://www.baeldung.com/java-email]
- UI Framework > Angular Material [https://material.angular.io/components/categories]
- Web Notification > Firebase [https://medium.com/@jishnusaha89/firebase-cloud-messaging-push-notifications-with-angular-1fb7f173bfba]

