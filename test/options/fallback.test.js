/* eslint-disable
  prefer-destructuring,
*/
import webpack from '../helpers/compiler';

describe('Options', () => {
  describe('fallback', () => {
    test('{String}', async () => {
      const config = {
        loader: {
          test: /\.png$/,
          options: {
            limit: 100,
            fallback: 'file-loader',
          },
        },
      };

      const stats = await webpack('fixture.js', config);
      const { source } = stats.toJson().modules[1];

      expect(source).toMatchSnapshot();
    });

    test('{Function}', async () => {
      const config = {
        loader: {
          test: /\.png$/,
          options: {
            limit: 100,
            fallback: function loader() {
              return "module.exports = 'https://www.vectorlogo.zone/logos/js_webpack/js_webpack-card.png'";
            },
          },
        },
      };

      const stats = await webpack('fixture.js', config);
      const { source } = stats.toJson().modules[1];

      expect(source).toMatchSnapshot();
    });
  });
});
