const path = require('path');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const fs = require('fs');

// Fonction pour découvrir automatiquement les blocs
function getBlockEntries() {
    const blocksDir = path.resolve(__dirname, 'blocks');
    const entries = {};
    
    if (fs.existsSync(blocksDir)) {
        const blockFolders = fs.readdirSync(blocksDir, { withFileTypes: true })
            .filter(dirent => dirent.isDirectory())
            .map(dirent => dirent.name);
        
        blockFolders.forEach(blockName => {
            const jsFile = path.resolve(__dirname, 'assets/js/blocks', `${blockName}.js`);
            const scssFile = path.resolve(__dirname, 'assets/scss/blocks', `${blockName}.scss`);
            
            if (fs.existsSync(jsFile)) {
                entries[`js/blocks/${blockName}`] = jsFile;
            }
            
            if (fs.existsSync(scssFile)) {
                entries[`css/blocks/${blockName}`] = scssFile;
            }
        });
    }
    
    return entries;
}

module.exports = (env, argv) => {
    const isProduction = argv.mode === 'production';
    
    return {
        entry: {
            // Fichiers principaux du thème
            'js/theme': './assets/js/theme.js',
            'js/admin': './assets/js/admin.js',
            'js/blocks-frontend': './assets/js/blocks-frontend.js',
            'js/blocks-editor': './assets/js/blocks-editor.js',
            
            // Styles principaux
            'css/theme': './assets/scss/theme.scss',
            'css/blocks-frontend': './assets/scss/blocks-frontend.scss',
            'css/blocks-editor': './assets/scss/blocks-editor.scss',
            
            // Blocs découverts automatiquement
            ...getBlockEntries()
        },
        output: {
            path: path.resolve(__dirname, 'assets/dist'),
            filename: '[name].js',
            clean: true
        },
        module: {
            rules: [
                {
                    test: /\.js$/,
                    exclude: /node_modules/,
                    use: {
                        loader: 'babel-loader',
                        options: {
                            presets: [
                                ['@babel/preset-env', {
                                    targets: {
                                        browsers: ['> 1%', 'last 2 versions']
                                    },
                                    modules: false
                                }]
                            ]
                        }
                    }
                },
                {
                    test: /\.scss$/,
                    use: [
                        MiniCssExtractPlugin.loader,
                        {
                            loader: 'css-loader',
                            options: {
                                sourceMap: !isProduction,
                                importLoaders: 2
                            }
                        },
                        {
                            loader: 'sass-loader',
                            options: {
                                sourceMap: !isProduction,
                                sassOptions: {
                                    outputStyle: isProduction ? 'compressed' : 'expanded'
                                }
                            }
                        }
                    ]
                },
                {
                    test: /\.(png|jpg|jpeg|gif|svg)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'images/[name][ext]'
                    }
                },
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    type: 'asset/resource',
                    generator: {
                        filename: 'fonts/[name][ext]'
                    }
                }
            ]
        },
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].css'
            })
        ],
        externals: {
            '@wordpress/blocks': ['wp', 'blocks'],
            '@wordpress/block-editor': ['wp', 'blockEditor'],
            '@wordpress/editor': ['wp', 'editor'],
            '@wordpress/components': ['wp', 'components'],
            '@wordpress/element': ['wp', 'element'],
            '@wordpress/i18n': ['wp', 'i18n'],
            '@wordpress/data': ['wp', 'data'],
            '@wordpress/compose': ['wp', 'compose']
        },
        resolve: {
            extensions: ['.js', '.jsx', '.scss', '.css']
        },
        devtool: isProduction ? false : 'source-map',
        stats: {
            colors: true,
            chunks: false,
            modules: false
        }
    };
};
