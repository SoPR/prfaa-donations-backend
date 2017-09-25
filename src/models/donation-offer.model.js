// donationOffer-model.js - A mongoose model
//
// See http://mongoosejs.com/docs/models.html
// for more of what you can do here.
module.exports = function (app) {
    const mongooseClient = app.get('mongooseClient');
    const {Schema}       = mongooseClient;
    const donationOffer  = new Schema({
        email:     {type: String, index: true, unique: false},
        offers:    [],
        state:     {type: String},
        createdAt: {type: Date, default: Date.now},
        updatedAt: {type: Date, default: Date.now}
    });

    return mongooseClient.model('donationOffer', donationOffer);
};
