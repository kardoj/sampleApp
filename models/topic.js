var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TopicSchema = new Schema({
    name: { type: String, required: true },
    created: { type: Date, default: Date.now },
    viewCount: {type: Number, default: 0},
});

var Topic = mongoose.model('Topic', TopicSchema);

module.exports = {
  Topic: Topic
};
