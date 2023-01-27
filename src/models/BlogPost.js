const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: { type: DataTypes.DATE, default: sequelize.literal('CURRENT_TIMESTAMPS()')},
    updated: { type: DataTypes.DATE, default: sequelize.literal('CURRENT_TIMESTAMPS()')},
  }, {
    tableName: 'blog_posts',
    underscored: true,
    timestamps: false,
  })

  BlogPost.associate = ({ User }) => {
    BlogPost.belongsTo(User, {
      as: 'user',
      foreignKey: 'userId' 
    })
  }

  return BlogPost;
}

module.exports = BlogPostSchema;