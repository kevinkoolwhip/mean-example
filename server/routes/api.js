var User = require('../models/user');
var Item = require('../models/item');
var jwt = require('jsonwebtoken');


module.exports = function (app, express) {
    var apiRouter = express.Router();

    apiRouter.use("/", function (req, res, next) {
        var token = req.body.token || req.param('token') || req.headers['x-access-token'];
        if (token) {
            jwt.verify(token, 'Secert', function (err, decoded) {
                if (err) {
                    return res.status(403).send({
                        success: false,
                        message: 'Failed to authenticate token.'
                    });
                } else {
                    req.decoded = decoded;
                    next();
                }
            });
        } else {
            return res.status(403).send({
                success: false,
                message: 'No token provided.'
            });
        }
    });

    apiRouter.route('/item')
        .post(function (req, res) {
            var item = new Item();
            item.name = req.body.name;
            item.price = req.body.price;
            item.quantity = req.body.quantity;
            item.location = req.body.location;

            item.save(function (err) {
                if (err) {
                    if (err.code == 11000)
                        return res.json({
                            success: false,
                            message: 'Item Already Exists'
                        });
                    else
                        return res.send(err);
                }
                res.json({message: 'Item Created'});
            })
        })
        .get(function (req, res) {
            Item.find(function (err, items) {
                if (err) res.send(err);
                res.json(items);
            });
        });

    apiRouter.route('/me')
        .get(function (req, res) {
            res.send(req.decoded);
        });


    apiRouter.route('/item/:item_id')

        .get(function (req, res) {
            Item.findById(req.params.item_id, function (err, user) {
                if (err) res.send(err);
                //return that user
                res.json(user);
            });
        })

        .delete(function (req, res) {
            Item.remove({
                _id: req.params.item_id
            }, function (err, user) {
                if (err) return res.send(err);
                res.json({message: 'Successfully deleted'});
            });
        });

    return apiRouter;

};