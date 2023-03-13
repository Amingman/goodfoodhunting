const methodOverride = require(`method-override`)

const method_override = methodOverride((req, res) => {
    if (req.body && typeof req.body === 'object' && '_method' in req.body) {
      // look in urlencoded POST bodies and delete it
      var method = req.body._method
      delete req.body._method
      console.log(`Deleting....`);
      return method
    }
})


module.exports = method_override
