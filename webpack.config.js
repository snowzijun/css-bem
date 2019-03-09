const path = require('path');
module.exports = {
    // 入口
    // 一旦package.json里面配置了webpack --mode=production,下面的mode:'production'就不必了
    mode:'production',
    entry:path.resolve(__dirname,'./src/index.js'),
    output: {
        // 出口重命名js
        filename: 'index.js',
        // 出口文件夹名
        path:path.resolve(__dirname,'dist'),
        //这个选项会尝试把库暴露给前使用的模块定义系统，这使其和CommonJS、AMD兼容或者暴露为全局变量。 
        libraryTarget:'umd',
        // 配置在全局变量上暴露的名称
        library: 'cssBem'
    },
    module:{
        rules:[
            {
                test:/(\.js)$/,
                use:{
                    loader:"babel-loader"
                },
                exclude:path.resolve(__dirname,"node_modules"),
                include:path.resolve(__dirname,"src")
            }
        ]
    }
}