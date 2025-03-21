const { join } = require('path');

module.exports = {
  presets: [require('../../tailwind.preset')], // Use shared preset
  content: [
    join(__dirname, 'src/**/*.{html,ts}'), // Scan app files
    join(__dirname, '../../libs/**/*.{html,ts}'), // Scan library files
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
