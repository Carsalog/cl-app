const mongoose = require('mongoose');
const Joi = require('joi');
const config = require('config');
const md5 = require('md5');

const message = new mongoose.Schema({
  sender: {
    type: mongoose.Schema.Types.ObjectId,
    ref: config.get('users.tableName')
  },
  chat: {
    type: String,
    trim: true,
    required: true
  },
  receiver: {
    type: mongoose.Schema.Types.ObjectId,
    ref: config.get('users.tableName')
  },
  text: {
    type: String,
    minlength: config.get('messages.text.min'),
    maxlength: config.get('messages.text.max'),
    required: true
  },
  date: {
    type: Date,
    required: true,
    default: Date.now
  },
  isActive: {
    type: Boolean,
    default: true
  },
  seen: {
    type: Boolean,
    default: false
  }
});


message.statics.getByUid = function (uid) {
  return this.aggregate(
    [
      {
        '$match': {
          '$or': [
            {'sender': mongoose.Types.ObjectId(uid)},
            {'receiver': mongoose.Types.ObjectId(uid)}
          ]
        }
      },
      {
        '$group': {
          '_id': "$chat",
          "sender_id": {"$first": "$sender"},
          "receiver_id": {"$first": "$receiver"},
          'count': {'$sum': 1},
          'messages': {'$push': '$$ROOT'}
        }
      },
      {
        "$lookup": {
          from: 'users',
          localField: 'sender_id',
          foreignField: '_id',
          as: 'user_1'
        }
      },
      {
        "$lookup": {
          from: 'users',
          localField: 'receiver_id',
          foreignField: '_id',
          as: 'user_2'
        }
      }
    ]
  );
};

message.statics.getBySenderReceiver = function (senderId, receiverId, cb) {
  return this.aggregate(
    [
      {'$match': {'to': senderId}},
      // { "$sort": { "date": 1 } },
      // { "$group": {
      //     "_id": "from",
      //     "to": { "$first": "$to" },
      //     "message": { "$first": "$message" },
      //     "date": { "$first": "$date" },
      //     "origId": { "$first": "$_id" }
      //   }},
      // { "$lookup": {
      //     "from": "users",
      //     "localField": "from",
      //     "foreignField": "_id",
      //     "as": "from"
      //   }},
      // { "$lookup": {
      //     "from": "users",
      //     "localField": "to",
      //     "foreignField": "_id",
      //     "as": "to"
      //   }},
      // { "$unwind": { "path" : "$from" } },
      // { "$unwind": { "path" : "$to" } }
    ],
    cb
  )
  // .find({
  //   sender: senderId,
  //   receiver: receiverId
  // })
  // .sort('date')
  // .groupBy()
  // .limit(config.get('messages.tableName'))
};

message.statics.create = function (sender, receiver, text) {

  const combined = [sender, receiver];
  combined.sort();
  const chat = md5(combined.join(''));

  const message = this({sender, receiver, text, chat});
  return message.save();
};

message.statics.update = async function (msg) {

  const current = await this.findById(msg._id);
  if (!current) return null;

  current.text = msg.text;
  if (msg.seen !== undefined)
    current.seen = msg.seen;
  return current.save();
};

message.statics.remove = function (_id) {
  return this.findByIdAndRemove(_id);
};

exports.Message = mongoose.model(String(config.get('messages.tableName')), message);

module.exports.validate = function (msg) {
  /**
   * Validate message data from a client
   *
   * @type {{sender: *, receiver: *, chat: *, text: *, date: *, isActive: Boolean, seen: Boolean}}
   * @return Object:
   */
  const schema = {
    _id: Joi.string(),
    sender: Joi.string().min(config.get("messages.id.min"))
      .max(config.get("messages.id.max")).required(),
    receiver: Joi.string().min(config.get("messages.id.min"))
      .max(config.get("messages.id.max")).required(),
    chat: Joi.string().min(config.get("messages.chat.min"))
      .max(config.get("messages.chat.max")),
    text: Joi.string().min(config.get("messages.text.min"))
      .max(config.get("messages.text.max")).required(),
    date: Joi.date(),
    isActive: Joi.boolean(),
    seen: Joi.boolean(),
    __v: Joi.any()
  };

  return Joi.validate(msg, schema);
};