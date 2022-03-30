1、添加css之类的babel处理器

npm i -D less less-loader css-loader style-loader

然后在webpack中添加rule

// 设置less文件的处理
{
    test: /\.less$/,
    use: [
        'style-loader',
        'css-loader',
        'less-loader'
    ]
}

// 这里的处理是从下往上的，所以需要先处理 less，转传css再处理，最后处理style


2、和ts转成js一样，有的css3在旧的浏览器中同样会报错
所以同样需要 处理新版本的css，去兼容老版本的css

npm i -D postcss postcss-loader postcss-preset-env


// 设置less文件的处理
{
    test: /\.less$/,
    use: [
        'style-loader',
        'css-loader',
        // 引入postcss
        {
            loader: 'postcss-loader',
            options: {
                postcssOptions: {
                    plugins: [
                        [
                            'postcss-preset-env',
                            {
                                browsers: 'last 2 versions'
                            }
                        ]
                    ]
                }
            }
        },
        'less-loader'
    ]
}


3、代码需要兼容IE 10，但是会出错

这个和 arrowFunction 一样，webpack默认使用const
需要设置默认 不使用 const

// 告诉webpack不使用箭头函数
environment: {
    arrowFunction: false,
    const: false
}


4、 如何给回调函数传参数







