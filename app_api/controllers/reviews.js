const mongoose = require('mongoose');
const Loc = mongoose.model('Location');

module.exports.reviewsCreate = (req, res) => {
}

module.exports.reviewsReadOne = (req, res) => {
  if (req.params && req.params.locationid && req.params.reviewid) {
    Loc.findById(req.params.locationid)
      .select('name reviews')
      .exec((err, location) => {
        var response, review;
        if (!location) {
          sendJsonResponse(res, 404, {
            'message': 'locationid not found'
          });
          return;
        } else if (err) {
          sendJsonResponse(res, 400, err);
          return;
        }

        if (location.reviews && location.reviews.length > 0) {
          review = location.reviews.id(req.params.reviewid);
          if (!review) {
            sendJsonResponse(res, 404, {
              'message': "reviewid not found"
            });
          } else {
            response = {
              location: {
                name: location.name,
                id: req.params.locationid
              },
              review: review
            };
            sendJsonResponse(res, 200, response);
          }
        } else {
          sendJsonResponse(res, 404, {
            'message': "No reviews found"
          })
        }
      })
  } else {
    sendJsonResponse(res, 404, {
      'message': "Not found, locationid and reviewid are both required"
    })
  }
}

module.exports.reviewsUpdateOne = (req, res) => {

}

module.exports.reviewsDeleteOne = (req, res) => {

}

const sendJsonResponse = function (res, status, content) {
  res.status(status);
  res.json(content);
};