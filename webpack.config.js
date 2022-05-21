const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

module.exports = {
    mode: "production",
    entry: "./src/index.js",
    output: {
        path: path.resolve(__dirname, "source/dist"),
        filename: "app.js",
    },
    module: {
        rules: [
            {
                test: /\.js$/i,
                include: path.resolve(__dirname, "src"),
                use: {
                    loader: "babel-loader",
                    options: {
                        presets: ["@babel/preset-env"],
                    },
                },
            },
            {
                test: /\.(css|html)$/i,
                include: path.resolve(__dirname, "src"),
                use: [MiniCssExtractPlugin.loader, "css-loader", "postcss-loader"],
            },
            {
                test: /\.(woff(2)?|ttf|otf|eot)$/,
                generator: {
                    filename: "fonts/[name][ext]",
                },
            },
        ],
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css",
        }),
    ],
    devServer: {
        static: path.resolve(__dirname, "source/dist"),
        watchFiles: ["source/**/*"],
        port: 9292,
        open: false,
        hot: true,
    },
};