const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = [
    // Frontend Code Block
    {
        entry: "./src/frontend/main.js",
        output: {
            path: path.resolve(__dirname, "dist", "frontend"),
            filename: "bundle.js"
        },
        devServer: {
            contentBase : path.resolve(__dirname, "public")
        },
        module: {
            rules: [
                {
                    test: /\.vue$/,
                    loader: "vue-loader"
                },
                {
                    test: /\.sass$/,
                    use: [
                        "vue-style-loader",
                        "css-loader",
                        {
                            loader: "sass-loader",
                            options: {
                                sassOptions: {
                                    indentedSyntax: true
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/
                }
            ]
        },
        resolve: {
            alias: {
                vue$: "vue/dist/vue.esm.js"
            },
            extensions: [ "*", ".js", ".vue", ".json" ]
        },
        plugins: [ 
            new VueLoaderPlugin(),
            new CopyPlugin([{from: "./public"}])
        ]
    },

    // Backend Code Block
    {
        target: "node",
        node: {
            __dirname: false
        },
        entry: "./src/backend/server.js",
        output: {
            path: path.resolve(__dirname, "dist", "backend"),
            filename: "server.js"
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: "babel-loader",
                    exclude: /node_modules/
                }
            ]
        }
    }
];