# Lynda React

 ## Table of Contents
- [Intalling Web Pack](#installing-web-pack)



 # Installing Web Pack

 ```sh
 npm install webpack babel-loader webpack-dev-server --save-dev
 npm install -g webpack
 npm install react react-dom --save
 npm install axios --save
 ```
>NOTE: If you prefer not to use global command `webpack`

 ```sh
 ./node_modules/.bin/webpack
 ```


 We then create a `Web pack config js` file

 ```js
 var webpack = require("webpack");
 module.exports = {
    entry:"./src/index.js",
    output:{
        path: "dist/assets",
        filename:"bundle.js",
        publicPath: "assets",
    },
    devServer:{
        inline:true,
        contentBase:"./dist",
        port:3000
    },
    module:{
        loaders:[
            {
                test:/\.js$/,
                exclude:/(node_modules)/,
                loader:["babel-loader"],
                query:{
                    presets:["latest", "state-0", "react"]
                }
            }
        ]
    }
 }
 ```