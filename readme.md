# StockXYZ

StockXYZ is a stock investment references tools

## Description

Create by Kua Zi Lin for IBF B2 Mini-Project (TFIP 2023 Batch 2 Jan 03 2023). This project consist of 2 parts , client(Angular) and server(Spring-boot). SQL Database Initialisation code was included in the stockserver folder. Both Client App and Server has been hosted on railway[https://stockxyz-production.up.railway.app/]


## Table of Contents

- [Feature](#feature)
- [Requirements](#requirements)
- [Contributing](#contributing)
- [License](#license)

## Feature

Key Features:
- Stock Fundamental
  - Fundamental from alphavantage api
  - Latest Price From twelvedata api and yahoo finance
- Stock Charts 
  - Price Charts
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
  - Used for password reset , reset token will be sent to the email accordingly
- Use Spring Boot security with JWT to authenticate and authorize Angular request (5pts)
  - Basic security setting with JWT token validation
- Use a UI component framework - eg. ng-bootstrap, Material, PrimeNG (4pts)
  - ng material was used in this project
- Adding a service worker to precache application assets (4pts)
  - service worker was added and precache all the html/js/css/assets

