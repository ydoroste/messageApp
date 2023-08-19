module.exports = function (api) {
    api.cache(true);
    return {
        presets: ['babel-preset-expo', 'module:metro-react-native-babel-preset'],
        plugins: [
            [
                'module-resolver',
                {
                    alias: {
                        '@followBack': './src',
                    },
                },
            ],
            'react-native-reanimated/plugin',
        ],
        env: {
            production: {
                plugins: ['react-native-paper/babel', 'react-native-reanimated/plugin'],
            },
        },
    };
};