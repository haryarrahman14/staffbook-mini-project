# Staffbook Mini Project

## Build Setup

```bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm run start

# generate static project
$ npm run generate
```

## Tools
- UI Framework : @nuxtjs/vuetify
- Modules : "@nuxtjs/axios", "@nuxtjs/auth-next"
- Api Data Trading Market : GET https://api.coingecko.com/api/v3/coins/markets
```bash
  Params : {
          vs_currency: "usd",
          order: "market_cap_desc",
          sparkline: false,
        }
```

## Notes
- For local running , don't forget to set process.env.PORT ( default port : 3000 )
- Cache / Update Frequency Data : every 45 seconds ( https://www.coingecko.com/en/api/documentation )
<img width="865" alt="Screen Shot 2023-09-14 at 08 57 06" src="https://github.com/haryarrahman14/staffbook-mini-project/assets/142674988/ea6c10c7-d5ef-4735-ba3b-32a62b46fd45">



## Result
https://github.com/haryarrahman14/staffbook-mini-project/assets/142674988/772a0f10-fb17-48aa-adef-a5e650e31f33




