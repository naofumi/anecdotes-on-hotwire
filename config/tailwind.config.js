const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './public/*.html',
    './app/helpers/**/*.rb',
    './app/javascript/**/*.js',
    './app/views/**/*.html.{erb,haml,slim}',
    './app/content/helpers/**/*.rb',
    './app/content/layouts/**/*.{md,erb,haml,html,slim}',
    './app/content/pages/**/*.{md,erb,haml,html,slim}',
    './app/content/application/**/*.{md,erb,haml,html,slim}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
    require('@tailwindcss/container-queries'),
  ]
}
