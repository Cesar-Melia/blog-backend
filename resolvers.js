const Post = require('./models/Post.model');

const resolvers = {
  Query: {
    hello: () => {
      return 'hello world';
    },
    getAllPosts: async () => {
      return await Post.find();
    },
    getPost: async (_parent, { id }, _context, _info) => {
      return await Post.findById(id);
    },
  },
  Mutation: {
    createPost: async (parent, args, context, info) => {
      const { title, description, url } = args.post;
      const month = {
        0: 'Enero',
        1: 'Febrero',
        2: 'Marzo',
        3: 'Abril',
        4: 'Mayo',
        5: 'Junio',
        6: 'Julio',
        7: 'Agosto',
        8: 'Septiembre',
        9: 'Octubre',
        10: 'Noviembre',
        11: 'Diciembre',
      };

      let date = new Date(Date.now());
      date = `${date.getDate()}-${month[date.getMonth()]}-${date.getFullYear()}`;

      const post = new Post({ title, description, url, date });
      await post.save();
      return post;
    },
    deletePost: async (parent, args, context, info) => {
      const { id } = args;
      await Post.findByIdAndDelete(id);
      return 'Ok, post deleted';
    },
    updatePost: async (parent, args, context, info) => {
      const { id } = args;
      const { title, description } = args.post;
      const updates = {};

      if (title !== undefined) {
        updates.title = title;
      }
      if (description !== undefined) {
        updates.description = description;
      }

      const post = await Post.findByIdAndUpdate(id, updates, { new: true });

      return post;
    },
  },
};

module.exports = resolvers;
