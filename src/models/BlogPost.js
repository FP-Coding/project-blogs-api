const { Sequelize } = require('sequelize')

const BlogPostSchema = (sequelize, DataTypes) => {
  const BlogPost = sequelize.define('BlogPost', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    title: DataTypes.STRING,
    content: DataTypes.STRING,
    userId: { type: DataTypes.INTEGER, foreignKey: true },
    published: { type: DataTypes.DATE, defaultValue: Sequelize.NOW()},
    updated: { type: DataTypes.DATE, defaultValue: Sequelize.NOW()},
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