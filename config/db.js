const { connect } = require('mongoose');

exports.db = async () => {
  const conn = await connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
  });
};
