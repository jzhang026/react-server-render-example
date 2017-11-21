var http = require('http'),
  browserify = require('browserify'),
  literalify = require('literalify'),
  React = require('react'),
  ReactDOMServer = require('react-dom/server');
import App from './App.js';

function callback(req, res) {
  if (req.url == '/') {
    res.setHeader('Content-Type', 'text/html; charset=utf-8')
    var props = {
      items: [
        'Item 0',
        'Item 1',
        'Item </scRipt>\u2028',
        'Item <!--inject!-->\u2029',
      ]
    }

    var html = ReactDOMServer.renderToStaticMarkup(
      <body>
        <div
          id='content'
          dangerouslySetInnerHTML: {
            __html: ReactDOMServer.renderToString(<App {...props} />)
          }
        />
        <script
          dangerouslySetInnerHTML: {
            __html: 'var APP_PROPS = ' + safeStringify(props) + ';'
          }
        />
        <script src='//cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react.min.js'/>
        <script src='//cdnjs.cloudflare.com/ajax/libs/react/15.4.2/react-dom.min.js'/>
        <script src='/bundle.js'/>
      </body>
    )
    res.end(html);
  } else if (req.url== './bundle.js') {
    res.setHeader('Content-Type', 'text/javascript')
    browserify()
      .add('./browser.js')
      .transform(literalify.configure({
        'react': 'window.React',
        'react-dom': 'window.ReactDOM',
      }))
      .bundle()
      .pipe(res)
  } else {
    res.statusCode = 404
    res.end()
  }
}

http.createServer(callback).listen(3000, function(err) {
  if(err) throw err
  console.log('Listening on 3000...')
})
function safeStringify(obj) {
  return JSON.stringify(obj)
    .replace(/<\/(script)/ig, '<\\/$1')
    .replace(/<!--/g, '<\\!--')
    .replace(/\u2028/g, '\\u2028') // Only necessary if interpreting as JS, which we do
    .replace(/\u2029/g, '\\u2029') // Ditto
}